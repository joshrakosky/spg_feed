'use client'

import { useEffect, useState } from 'react'
import { fetchProgramMealsTotal } from '@/lib/mealsTotal'

interface MealsCounterProps {
  /** Compact layout for headers on checkout pages */
  variant?: 'hero' | 'compact'
  className?: string
}

/**
 * Fetches cumulative school meals from all SPG FEED orders.
 * Totals are computed from spg_feed_order_items.school_meals snapshots.
 */
export default function MealsCounter({ variant = 'hero', className = '' }: MealsCounterProps) {
  const [totalMeals, setTotalMeals] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchProgramMealsTotal().then((total) => {
      if (!cancelled) setTotalMeals(total)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const formatted = totalMeals === null ? '—' : totalMeals.toLocaleString('en-US')

  if (variant === 'compact') {
    return (
      <p className={`text-sm text-gray-600 ${className}`}>
        <span className="font-semibold text-black">{formatted}</span> school meals provided so far
      </p>
    )
  }

  return (
    <div
      className={`rounded-lg border-2 border-black bg-white px-6 py-5 text-center ${className}`}
    >
      <p className="text-sm uppercase tracking-wide text-gray-600 mb-1">Program impact</p>
      <p className="text-4xl font-bold text-black">{formatted}</p>
      <p className="text-gray-700 mt-1">school meals provided through this program</p>
    </div>
  )
}
