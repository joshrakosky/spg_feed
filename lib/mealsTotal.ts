import { getSupabaseErrorMessage, isSupabaseConfigured, supabase } from '@/lib/supabase'

let cachedTotal: number | null = null
let inflight: Promise<number> | null = null
let loggedFetchError = false

/**
 * Fetches cumulative school meals once and caches for all MealsCounter instances.
 */
export async function fetchProgramMealsTotal(): Promise<number> {
  if (cachedTotal !== null) return cachedTotal
  if (inflight) return inflight

  if (!isSupabaseConfigured) {
    cachedTotal = 0
    return 0
  }

  inflight = (async () => {
    const { data, error } = await supabase
      .from('spg_feed_order_items')
      .select('school_meals')

    if (error) {
      if (!loggedFetchError && process.env.NODE_ENV === 'development') {
        console.warn('Could not load program meals total:', getSupabaseErrorMessage(error))
        loggedFetchError = true
      }
      cachedTotal = 0
      return 0
    }

    const total = (data ?? []).reduce((acc, row) => acc + (row.school_meals ?? 0), 0)
    cachedTotal = total
    return total
  })()

  try {
    return await inflight
  } finally {
    inflight = null
  }
}

/** Call after a new order so counters refresh */
export function invalidateProgramMealsTotal(): void {
  cachedTotal = null
  loggedFetchError = false
}
