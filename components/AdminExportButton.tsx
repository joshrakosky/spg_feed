'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import * as XLSX from 'xlsx'
import { OrderWithItems } from '@/types'

export default function AdminExportButton() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuth')
    setIsAdmin(adminAuth === 'true')
  }, [])

  const exportToExcel = async () => {
    if (!isAdmin) return

    try {
      setLoading(true)

      const { data: ordersData, error: ordersError } = await supabase
        .from('spg_feed_orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      const ordersWithItems: OrderWithItems[] = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: items, error: itemsError } = await supabase
            .from('spg_feed_order_items')
            .select('*')
            .eq('order_id', order.id)
            .order('created_at')

          if (itemsError) throw itemsError

          return { ...order, items: items || [] }
        })
      )

      const detailedData = ordersWithItems.flatMap((order) =>
        order.items.map((item) => ({
          'Order Number': order.order_number,
          Email: order.email,
          'Full Name': order.shipping_name,
          Phone: order.shipping_phone ?? '',
          'Product Name': item.product_name,
          'Customer Item #': item.customer_item_number || '',
          'School Meals': item.school_meals,
          'Shipping Address': order.shipping_address,
          'Address Line 2': order.shipping_address2 ?? '',
          City: order.shipping_city,
          State: order.shipping_state,
          ZIP: order.shipping_zip,
          Country: order.shipping_country,
          'Order Date': new Date(order.created_at).toLocaleDateString(),
        }))
      )

      type SummaryEntry = { quantity: number; schoolMeals: number }
      const summaryMap = new Map<string, SummaryEntry>()

      ordersWithItems.forEach((order) => {
        order.items.forEach((item) => {
          const key = [item.product_name, item.customer_item_number || ''].join('|')
          const existing = summaryMap.get(key)
          if (existing) {
            summaryMap.set(key, {
              quantity: existing.quantity + 1,
              schoolMeals: existing.schoolMeals + item.school_meals,
            })
          } else {
            summaryMap.set(key, { quantity: 1, schoolMeals: item.school_meals })
          }
        })
      })

      const summaryData = Array.from(summaryMap.entries())
        .map(([key, data]) => {
          const [productName, customerItem] = key.split('|')
          return {
            'Product Name': productName,
            'Customer Item #': customerItem,
            Quantity: data.quantity,
            'Total School Meals': data.schoolMeals,
          }
        })
        .sort((a, b) =>
          (a['Product Name'] as string).localeCompare(b['Product Name'] as string)
        )

      const totalMeals = ordersWithItems.reduce(
        (sum, order) =>
          sum + order.items.reduce((itemSum, item) => itemSum + item.school_meals, 0),
        0
      )

      const wb = XLSX.utils.book_new()
      const wsDetailed = XLSX.utils.json_to_sheet(detailedData)
      XLSX.utils.book_append_sheet(wb, wsDetailed, 'Detailed Orders')

      const wsSummary = XLSX.utils.json_to_sheet([
        ...summaryData,
        {},
        { 'Product Name': 'PROGRAM TOTAL', 'Total School Meals': totalMeals },
      ])
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Distribution Summary')

      const filename = `spg-feed-orders-${new Date().toISOString().split('T')[0]}.xlsx`
      XLSX.writeFile(wb, filename)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAdmin) return null

  return (
    <button
      onClick={exportToExcel}
      disabled={loading}
      className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center bg-black text-white transition-opacity shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Export all orders to Excel (Admin only)"
      aria-label="Export orders"
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="white"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )}
    </button>
  )
}
