import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export const userTokenName = `sb-${import.meta.env.VITE_SUPABASE_PROJECT_KEY}-auth-token`;
export const currentUser = localStorage.getItem(userTokenName);

export default supabase;
