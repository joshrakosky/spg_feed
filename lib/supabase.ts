// Supabase client — lazy init so builds succeed without env vars at compile time.
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase credentials not configured')
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey)
  }
  return client
}

/** Lazy Supabase client (throws if env vars are missing) */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const active = getClient()
    const value = Reflect.get(active, prop, receiver)
    return typeof value === 'function' ? value.bind(active) : value
  },
})

/** Readable message from Supabase/Postgrest errors */
export function getSupabaseErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: string }).message)
  }
  return 'Unknown database error'
}
