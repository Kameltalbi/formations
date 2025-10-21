/*
  # Correction des colonnes de prix
  
  Cette migration :
  1. Ajoute la colonne prix_usd (pour USD)
  2. Supprime la colonne prix_eur (remplacée par prix_usd)
*/

-- Étape 1 : Ajouter la colonne prix_usd
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'plan_formations' AND column_name = 'prix_usd'
    ) THEN
        ALTER TABLE plan_formations ADD COLUMN prix_usd numeric(10,2);
        RAISE NOTICE 'Colonne prix_usd ajoutée avec succès';
    ELSE
        RAISE NOTICE 'Colonne prix_usd existe déjà';
    END IF;
END $$;

-- Étape 2 : Copier les données de prix_eur vers prix_usd (si prix_eur existe)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'plan_formations' AND column_name = 'prix_eur'
    ) THEN
        -- Copier les valeurs de prix_eur vers prix_usd
        UPDATE plan_formations 
        SET prix_usd = prix_eur 
        WHERE prix_eur IS NOT NULL;
        
        RAISE NOTICE 'Données copiées de prix_eur vers prix_usd';
        
        -- Supprimer la colonne prix_eur
        ALTER TABLE plan_formations DROP COLUMN prix_eur;
        RAISE NOTICE 'Colonne prix_eur supprimée';
    ELSE
        RAISE NOTICE 'Colonne prix_eur n''existe pas, aucune action nécessaire';
    END IF;
END $$;

-- Étape 3 : Vérifier le résultat
DO $$
DECLARE
    col_record RECORD;
BEGIN
    RAISE NOTICE '=== Structure finale de plan_formations ===';
    
    FOR col_record IN 
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'plan_formations' 
        AND column_name IN ('prix_dt', 'prix_usd')
        ORDER BY ordinal_position
    LOOP
        RAISE NOTICE 'Colonne: % | Type: % | Nullable: % | Default: %', 
            col_record.column_name, 
            col_record.data_type, 
            col_record.is_nullable, 
            col_record.column_default;
    END LOOP;
    
    RAISE NOTICE '=== Colonnes de prix vérifiées ===';
END $$;






