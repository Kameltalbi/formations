/*
  # Création de la table des utilisateurs administrateurs

  1. Nouvelle table
    - `admin_users`
      - `id` (uuid, clé primaire, référence auth.users)
      - `email` (text) - Email de l'admin
      - `full_name` (text) - Nom complet
      - `role` (text) - Rôle (super_admin, admin, moderator)
      - `permissions` (jsonb) - Permissions spécifiques
      - `is_active` (boolean) - Compte actif
      - `last_login` (timestamp) - Dernière connexion
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur la table `admin_users`
    - Politique pour que les admins puissent se voir entre eux
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator')),
  permissions jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Politique pour que les admins puissent se voir
CREATE POLICY "Admins peuvent se voir entre eux"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Politique pour que les super admins puissent tout gérer
CREATE POLICY "Super admins peuvent tout gérer"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role = 'super_admin' AND au.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role = 'super_admin' AND au.is_active = true
    )
  );

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index pour les performances
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users (email);
CREATE INDEX IF NOT EXISTS admin_users_role_idx ON admin_users (role);
CREATE INDEX IF NOT EXISTS admin_users_active_idx ON admin_users (is_active);