/*
  # Ajout des colonnes manquantes dans inscriptions
  
  Cette migration ajoute les colonnes nécessaires pour lier
  les inscriptions aux utilisateurs et aux formations
*/

-- Ajouter la colonne user_id si elle n'existe pas
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inscriptions' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE inscriptions ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
        RAISE NOTICE 'Colonne user_id ajoutée';
    ELSE
        RAISE NOTICE 'Colonne user_id existe déjà';
    END IF;
END $$;

-- Ajouter la colonne formation_id si elle n'existe pas
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inscriptions' AND column_name = 'formation_id'
    ) THEN
        ALTER TABLE inscriptions ADD COLUMN formation_id bigint REFERENCES plan_formations(id) ON DELETE CASCADE;
        RAISE NOTICE 'Colonne formation_id ajoutée';
    ELSE
        RAISE NOTICE 'Colonne formation_id existe déjà';
    END IF;
END $$;

-- Ajouter la colonne status si elle n'existe pas
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inscriptions' AND column_name = 'status'
    ) THEN
        ALTER TABLE inscriptions ADD COLUMN status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled'));
        RAISE NOTICE 'Colonne status ajoutée';
    ELSE
        RAISE NOTICE 'Colonne status existe déjà';
    END IF;
END $$;

-- Ajouter la colonne email si elle n'existe pas
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inscriptions' AND column_name = 'email'
    ) THEN
        ALTER TABLE inscriptions ADD COLUMN email text;
        RAISE NOTICE 'Colonne email ajoutée';
    ELSE
        RAISE NOTICE 'Colonne email existe déjà';
    END IF;
END $$;

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS inscriptions_user_id_idx ON inscriptions(user_id);
CREATE INDEX IF NOT EXISTS inscriptions_formation_id_idx ON inscriptions(formation_id);
CREATE INDEX IF NOT EXISTS inscriptions_status_idx ON inscriptions(status);
CREATE INDEX IF NOT EXISTS inscriptions_email_idx ON inscriptions(email);

-- Vérifier que les colonnes ont été ajoutées
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'inscriptions'
ORDER BY ordinal_position;
