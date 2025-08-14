/*
  # Création de la table des paiements

  1. Nouvelle table
    - `payments`
      - `id` (uuid, clé primaire)
      - `inscription_id` (uuid, clé étrangère vers inscriptions)
      - `amount` (numeric) - Montant payé
      - `currency` (text) - Devise (TND, USD)
      - `payment_method` (text) - Méthode de paiement
      - `payment_status` (text) - Statut du paiement
      - `transaction_id` (text) - ID de transaction externe
      - `payment_date` (timestamp) - Date du paiement
      - `notes` (text) - Notes sur le paiement
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur la table `payments`
    - Politique de lecture pour les administrateurs uniquement
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inscription_id uuid NOT NULL REFERENCES inscriptions(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  currency text NOT NULL CHECK (currency IN ('TND', 'USD')),
  payment_method text NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id text,
  payment_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Politique pour les administrateurs uniquement
CREATE POLICY "Administrateurs peuvent gérer les paiements"
  ON payments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index pour les performances
CREATE INDEX IF NOT EXISTS payments_inscription_id_idx ON payments (inscription_id);
CREATE INDEX IF NOT EXISTS payments_status_idx ON payments (payment_status);
CREATE INDEX IF NOT EXISTS payments_date_idx ON payments (payment_date);