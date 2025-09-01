/*
  # Création de la table payments pour l'intégration Konnect

  Cette table stocke tous les paiements des formations
*/

-- Créer la table payments
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

-- Activer RLS (Row Level Security)
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

-- Vérifier que la table a été créée correctement
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'payments'
    ) THEN
        RAISE NOTICE 'Table payments créée avec succès';
        
        -- Afficher le nombre de colonnes
        RAISE NOTICE 'Nombre de colonnes: %', (
            SELECT COUNT(*) 
            FROM information_schema.columns 
            WHERE table_name = 'payments'
        );
    ELSE
        RAISE NOTICE 'Erreur: Table payments non créée';
    END IF;
END $$;


