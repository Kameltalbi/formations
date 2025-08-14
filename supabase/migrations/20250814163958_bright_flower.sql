/*
  # Création de la table de liaison inscriptions-sessions

  1. Nouvelle table
    - `participants`
      - `id` (uuid, clé primaire)
      - `inscription_id` (uuid, clé étrangère vers inscriptions)
      - `session_id` (uuid, clé étrangère vers sessions)
      - `attendance_status` (text) - Statut de présence
      - `completion_status` (text) - Statut de completion
      - `certificate_issued` (boolean) - Certificat émis
      - `certificate_date` (timestamp) - Date d'émission du certificat
      - `notes` (text) - Notes sur le participant
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur la table `participants`
    - Politique de lecture pour les administrateurs
*/

CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inscription_id uuid NOT NULL REFERENCES inscriptions(id) ON DELETE CASCADE,
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  attendance_status text NOT NULL DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'present', 'absent', 'partial')),
  completion_status text NOT NULL DEFAULT 'in_progress' CHECK (completion_status IN ('in_progress', 'completed', 'failed', 'withdrawn')),
  certificate_issued boolean DEFAULT false,
  certificate_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(inscription_id, session_id)
);

ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Politique pour les administrateurs
CREATE POLICY "Administrateurs peuvent gérer les participants"
  ON participants
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_participants_updated_at
  BEFORE UPDATE ON participants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index pour les performances
CREATE INDEX IF NOT EXISTS participants_inscription_id_idx ON participants (inscription_id);
CREATE INDEX IF NOT EXISTS participants_session_id_idx ON participants (session_id);
CREATE INDEX IF NOT EXISTS participants_completion_idx ON participants (completion_status);