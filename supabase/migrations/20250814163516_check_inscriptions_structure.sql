/*
  # Diagnostic de la structure de la table inscriptions
  
  Cette migration vérifie la structure actuelle et ajoute
  les colonnes manquantes si nécessaire
*/

-- Vérifier la structure actuelle
SELECT 
    'Structure actuelle de inscriptions:' as info,
    '' as detail;

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'inscriptions'
ORDER BY ordinal_position;

-- Essayer d'ajouter user_id directement
DO $$
BEGIN
    BEGIN
        ALTER TABLE inscriptions ADD COLUMN user_id uuid;
        RAISE NOTICE 'Colonne user_id ajoutée (sans contrainte)';
    EXCEPTION WHEN duplicate_column THEN
        RAISE NOTICE 'Colonne user_id existe déjà';
    END;
END $$;

-- Essayer d'ajouter formation_id directement
DO $$
BEGIN
    BEGIN
        ALTER TABLE inscriptions ADD COLUMN formation_id bigint;
        RAISE NOTICE 'Colonne formation_id ajoutée (sans contrainte)';
    EXCEPTION WHEN duplicate_column THEN
        RAISE NOTICE 'Colonne formation_id existe déjà';
    END;
END $$;

-- Essayer d'ajouter status directement
DO $$
BEGIN
    BEGIN
        ALTER TABLE inscriptions ADD COLUMN status text DEFAULT 'pending';
        RAISE NOTICE 'Colonne status ajoutée';
    EXCEPTION WHEN duplicate_column THEN
        RAISE NOTICE 'Colonne status existe déjà';
    END;
END $$;

-- Essayer d'ajouter email directement
DO $$
BEGIN
    BEGIN
        ALTER TABLE inscriptions ADD COLUMN email text;
        RAISE NOTICE 'Colonne email ajoutée';
    EXCEPTION WHEN duplicate_column THEN
        RAISE NOTICE 'Colonne email existe déjà';
    END;
END $$;

-- Vérifier la structure finale
SELECT 
    'Structure finale de inscriptions:' as info,
    '' as detail;

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'inscriptions'
ORDER BY ordinal_position;

