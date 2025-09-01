/*
  # Diagnostic - Vérification de la structure de plan_formations

  Cette migration vérifie la structure existante de la table plan_formations
  et ajoute les colonnes manquantes si nécessaire.
*/

-- Vérifier et afficher la structure actuelle
DO $$
DECLARE
    col_record RECORD;
BEGIN
    RAISE NOTICE '=== Structure actuelle de plan_formations ===';
    
    FOR col_record IN 
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'plan_formations' 
        ORDER BY ordinal_position
    LOOP
        RAISE NOTICE 'Colonne: % | Type: % | Nullable: % | Default: %', 
            col_record.column_name, 
            col_record.data_type, 
            col_record.is_nullable, 
            col_record.column_default;
    END LOOP;
    
    RAISE NOTICE '=== Fin de la structure ===';
END $$;

-- Vérifier si les colonnes prix_dt et prix_usd existent
DO $$
BEGIN
    -- Vérifier prix_dt
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'plan_formations' AND column_name = 'prix_dt'
    ) THEN
        RAISE NOTICE 'Colonne prix_dt manquante - Ajout en cours...';
        ALTER TABLE plan_formations ADD COLUMN prix_dt numeric(10,2);
    ELSE
        RAISE NOTICE 'Colonne prix_dt existe déjà';
    END IF;
    
    -- Vérifier prix_usd
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'plan_formations' AND column_name = 'prix_usd'
    ) THEN
        RAISE NOTICE 'Colonne prix_usd manquante - Ajout en cours...';
        ALTER TABLE plan_formations ADD COLUMN prix_usd numeric(10,2);
    ELSE
        RAISE NOTICE 'Colonne prix_usd existe déjà';
    END IF;
    
    -- Vérifier autres colonnes importantes
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'plan_formations' AND column_name = 'slug'
    ) THEN
        RAISE NOTICE 'Colonne slug manquante - Ajout en cours...';
        ALTER TABLE plan_formations ADD COLUMN slug text UNIQUE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'plan_formations' AND column_name = 'is_active'
    ) THEN
        RAISE NOTICE 'Colonne is_active manquante - Ajout en cours...';
        ALTER TABLE plan_formations ADD COLUMN is_active boolean DEFAULT true;
    END IF;
    
    RAISE NOTICE 'Vérification terminée';
END $$;


