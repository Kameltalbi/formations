/*
  # Intégration Konnect - Table payments et RLS

  1. Nouvelle table
    - `payments` - Journal des paiements Konnect
      - `id` (uuid, clé primaire)
      - `user_id` (uuid, FK auth.users)
      - `training_id` (bigint, FK plan_formations.id)
      - `provider` (text, default 'konnect')
      - `provider_payment_id` (text, ID Konnect, unique)
      - `status` (text, enum: created, pending, succeeded, failed, canceled)
      - `amount` (numeric, montant)
      - `currency` (text, devise)
      - `raw` (jsonb, réponse brute Konnect)
      - `created_at`, `updated_at`

  2. Sécurité
    - Enable RLS sur la table `payments`
    - Politique de lecture : utilisateur ne lit que ses lignes
    - Politique d'insertion/modification : service role uniquement
*/

-- Créer la table payments si elle n'existe pas
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  training_id bigint NOT NULL REFERENCES plan_formations(id) ON DELETE CASCADE,
  provider text NOT NULL DEFAULT 'konnect',
  provider_payment_id text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'pending', 'succeeded', 'failed', 'canceled')),
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL,
  raw jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS payments_user_id_idx ON payments(user_id);
CREATE INDEX IF NOT EXISTS payments_training_id_idx ON payments(training_id);
CREATE INDEX IF NOT EXISTS payments_provider_payment_id_idx ON payments(provider_payment_id);
CREATE INDEX IF NOT EXISTS payments_status_idx ON payments(status);
CREATE INDEX IF NOT EXISTS payments_created_at_idx ON payments(created_at);

-- Activer RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture par l'utilisateur (ses propres paiements)
CREATE POLICY "Utilisateurs peuvent lire leurs propres paiements"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Politique pour l'insertion/modification via service role (Edge Functions)
CREATE POLICY "Service role peut tout faire sur payments"
  ON payments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_payments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_payments_updated_at();

-- Vérifier que la table inscriptions existe et a les bonnes colonnes
DO $$
BEGIN
  -- Ajouter la colonne status si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'inscriptions' AND column_name = 'status'
  ) THEN
    ALTER TABLE inscriptions ADD COLUMN status text DEFAULT 'pending';
  END IF;
  
  -- Ajouter la colonne formation_id si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'inscriptions' AND column_name = 'formation_id'
  ) THEN
    ALTER TABLE inscriptions ADD COLUMN formation_id bigint REFERENCES plan_formations(id);
  END IF;
  
  -- Ajouter la colonne user_id si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'inscriptions' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE inscriptions ADD COLUMN user_id uuid REFERENCES auth.users(id);
  END IF;
  
  -- Ajouter la colonne email si elle n'existe pas (pour la compatibilité avec l'ancienne structure)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'inscriptions' AND column_name = 'email'
  ) THEN
    ALTER TABLE inscriptions ADD COLUMN email text;
  END IF;
END $$;

-- Index pour inscriptions
CREATE INDEX IF NOT EXISTS inscriptions_user_id_idx ON inscriptions(user_id);
CREATE INDEX IF NOT EXISTS inscriptions_formation_id_idx ON inscriptions(formation_id);
CREATE INDEX IF NOT EXISTS inscriptions_status_idx ON inscriptions(status);
