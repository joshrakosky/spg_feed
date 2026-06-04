// Supabase client — lazy init so builds succeed without env vars at compile time.
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Trim whitespace; trailing newlines in Vercel env vars break fetch Headers (Invalid value).
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim()
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim()

export const isSupabaseConfigured =
  supabaseUrl.length > 0 &&
  supabaseAnonKey.length > 0 &&
  supabaseUrl.startsWith('http')

let client: SupabaseClient | null = null

/** Returns a singleton Supabase client (throws if env vars are missing/invalid). */
export function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase credentials not configured')
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey)
  }
  return client
}

/** Readable message from Supabase/Postgrest errors */
export function getSupabaseErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: string }).message)
  }
  return 'Unknown database error'
}
