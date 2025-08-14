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
  session_id?: string;
  source?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Session {
  id?: string;
  title: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  current_participants: number;
  price_tn: number;
  price_usd: number;
  status: 'open' | 'full' | 'cancelled' | 'completed';
  zoom_link?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Payment {
  id?: string;
  inscription_id: string;
  amount: number;
  currency: 'TND' | 'USD';
  payment_method: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id?: string;
  payment_date?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Participant {
  id?: string;
  inscription_id: string;
  session_id: string;
  attendance_status: 'registered' | 'present' | 'absent' | 'partial';
  completion_status: 'in_progress' | 'completed' | 'failed' | 'withdrawn';
  certificate_issued: boolean;
  certificate_date?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id?: string;
  participant_id: string;
  certificate_number: string;
  issued_date: string;
  valid_until?: string;
  certificate_type: 'participation' | 'completion' | 'excellence';
  pdf_url?: string;
  verification_code: string;
  status: 'active' | 'revoked' | 'expired';
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: Record<string, any>;
  is_active: boolean;
  last_login?: string;
  created_at?: string;
  updated_at?: string;
}