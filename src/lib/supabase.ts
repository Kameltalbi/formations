import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variables d\'environnement Supabase manquantes');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export interface Inscription {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company?: string;
  role?: string;
  country?: string;
  notes?: string;
  payment_method: string;
  detected_region: string;
  price: number;
  currency: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}