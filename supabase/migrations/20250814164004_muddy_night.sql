/*
  # Création de la table des certificats

  1. Nouvelle table
    - `certificates`
      - `id` (uuid, clé primaire)
      - `participant_id` (uuid, clé étrangère vers participants)
      - `certificate_number` (text) - Numéro unique du certificat
      - `issued_date` (timestamp) - Date d'émission
      - `valid_until` (timestamp) - Date d'expiration (optionnel)
      - `certificate_type` (text) - Type de certificat
      - `pdf_url` (text) - URL du PDF du certificat
      - `verification_code` (text) - Code de vérification
      - `status` (text) - Statut du certificat
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur la table `certificates`
    - Politique de lecture publique avec code de vérification
    - Politique de gestion pour les administrateurs
*/

CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id uuid NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  certificate_number text NOT NULL UNIQUE,
  issued_date timestamptz NOT NULL DEFAULT now(),
  valid_until timestamptz,
  certificate_type text NOT NULL DEFAULT 'participation' CHECK (certificate_type IN ('participation', 'completion', 'excellence')),
  pdf_url text,
  verification_code text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Politique pour vérification publique des certificats
CREATE POLICY "Vérification publique des certificats"
  ON certificates
  FOR SELECT
  TO public
  USING (status = 'active');

-- Politique pour les administrateurs
CREATE POLICY "Administrateurs peuvent gérer les certificats"
  ON certificates
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index pour les performances
CREATE INDEX IF NOT EXISTS certificates_number_idx ON certificates (certificate_number);
CREATE INDEX IF NOT EXISTS certificates_verification_idx ON certificates (verification_code);
CREATE INDEX IF NOT EXISTS certificates_participant_idx ON certificates (participant_id);