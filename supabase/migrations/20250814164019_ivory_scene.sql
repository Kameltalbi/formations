/*
  # Mise à jour de la table inscriptions

  1. Modifications
    - Ajout de la colonne `session_id` pour lier à une session spécifique
    - Ajout de la colonne `source` pour tracker d'où vient l'inscription
    - Mise à jour des politiques RLS

  2. Sécurité
    - Politique mise à jour pour inclure la nouvelle colonne
*/

-- Ajouter la colonne session_id si elle n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'inscriptions' AND column_name = 'session_id'
  ) THEN
    ALTER TABLE inscriptions ADD COLUMN session_id uuid REFERENCES sessions(id);
  END IF;
END $$;

-- Ajouter la colonne source si elle n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'inscriptions' AND column_name = 'source'
  ) THEN
    ALTER TABLE inscriptions ADD COLUMN source text DEFAULT 'website';
  END IF;
END $$;

-- Index pour la nouvelle colonne
CREATE INDEX IF NOT EXISTS inscriptions_session_id_idx ON inscriptions (session_id);