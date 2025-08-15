// src/supabase.ts
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anon) {
  console.error('VITE_SUPABASE_URL:', url, 'VITE_SUPABASE_ANON_KEY:', anon ? '(présente)' : '(absente)');
  throw new Error("Variables d'environnement Supabase manquantes");
}

export const supabase = createClient(url, anon);
