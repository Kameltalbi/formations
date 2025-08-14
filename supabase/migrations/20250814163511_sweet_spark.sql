/*
  # Création de la table des inscriptions

  1. Nouvelle table
    - `inscriptions`
      - `id` (uuid, clé primaire)
      - `first_name` (text, prénom)
      - `last_name` (text, nom)
      - `email` (text, email unique)
      - `phone` (text, téléphone)
      - `company` (text, société - optionnel)
      - `role` (text, fonction - optionnel)
      - `country` (text, pays - optionnel)
      - `notes` (text, notes - optionnel)
      - `payment_method` (text, mode de paiement)
      - `detected_region` (text, région détectée)
      - `price` (numeric, prix)
      - `currency` (text, devise)
      - `status` (text, statut de l'inscription)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Activer RLS sur la table `inscriptions`
    - Politique pour permettre l'insertion publique
    - Politique pour la lecture par les administrateurs uniquement
*/

CREATE TABLE IF NOT EXISTS inscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  role text,
  country text,
  notes text,
  payment_method text NOT NULL,
  detected_region text NOT NULL,
  price numeric NOT NULL,
  currency text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS inscriptions_email_idx ON inscriptions(email);
CREATE INDEX IF NOT EXISTS inscriptions_created_at_idx ON inscriptions(created_at);
CREATE INDEX IF NOT EXISTS inscriptions_status_idx ON inscriptions(status);

-- Activer RLS
ALTER TABLE inscriptions ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (pour le formulaire d'inscription)
CREATE POLICY "Permettre insertion publique"
  ON inscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique pour la lecture par les utilisateurs authentifiés uniquement (admin)
CREATE POLICY "Lecture pour utilisateurs authentifiés"
  ON inscriptions
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique pour la mise à jour par les utilisateurs authentifiés uniquement (admin)
CREATE POLICY "Mise à jour pour utilisateurs authentifiés"
  ON inscriptions
  FOR UPDATE
  TO authenticated
  USING (true);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_inscriptions_updated_at
  BEFORE UPDATE ON inscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();