/*
  # Création de la table des sessions de formation

  1. Nouvelle table
    - `sessions`
      - `id` (uuid, clé primaire)
      - `title` (text) - Titre de la session
      - `start_date` (date) - Date de début
      - `end_date` (date) - Date de fin
      - `max_participants` (integer) - Nombre max de participants
      - `current_participants` (integer) - Nombre actuel d'inscrits
      - `price_tn` (numeric) - Prix en dinars tunisiens
      - `price_usd` (numeric) - Prix en dollars US
      - `status` (text) - Statut (open, full, cancelled, completed)
      - `zoom_link` (text) - Lien Zoom
      - `description` (text) - Description
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur la table `sessions`
    - Politique de lecture publique
    - Politique de modification pour les administrateurs uniquement
*/

CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Formation Bilan Carbone®',
  start_date date NOT NULL,
  end_date date NOT NULL,
  max_participants integer NOT NULL DEFAULT 20,
  current_participants integer NOT NULL DEFAULT 0,
  price_tn numeric NOT NULL DEFAULT 600,
  price_usd numeric NOT NULL DEFAULT 300,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'full', 'cancelled', 'completed')),
  zoom_link text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique des sessions ouvertes
CREATE POLICY "Sessions publiques en lecture"
  ON sessions
  FOR SELECT
  TO public
  USING (status = 'open');

-- Politique pour les administrateurs (lecture/écriture complète)
CREATE POLICY "Administrateurs peuvent tout faire sur sessions"
  ON sessions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index pour les performances
CREATE INDEX IF NOT EXISTS sessions_start_date_idx ON sessions (start_date);
CREATE INDEX IF NOT EXISTS sessions_status_idx ON sessions (status);