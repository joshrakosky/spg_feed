'use client'

import { useState, useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase'
import * as XLSX from 'xlsx'
import { OrderWithItems } from '@/types'
import HelpIcon from '@/components/HelpIcon'

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin'

  useEffect(() => {
    if (authenticated) {
      loadOrders()
    }
  }, [authenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const loadOrders = async () => {
    try {
      setLoading(true)

      const { data: ordersData, error: ordersError } = await getSupabaseClient()
        .from('spg_feed_orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: items, error: itemsError } = await getSupabaseClient()
            .from('spg_feed_order_items')
            .select('*')
            .eq('order_id', order.id)
            .order('created_at')

          if (itemsError) throw itemsError

          return { ...order, items: items || [] }
        })
      )

      setOrders(ordersWithItems)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load orders'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = async () => {
    const detailedData = orders.flatMap((order) =>
      order.items.map((item) => ({
        'Order Number': order.order_number,
        Email: order.email,
        'Full Name': order.shipping_name,
        Phone: order.shipping_phone ?? '',
        'Product Name': item.product_name,
        'Customer Item #': item.customer_item_number || '',
        'School Meals': item.school_meals,
        'Shipping Address': order.shipping_address,
        City: order.shipping_city,
        State: order.shipping_state,
        ZIP: order.shipping_zip,
        Country: order.shipping_country,
        'Order Date': new Date(order.created_at).toLocaleDateString(),
      }))
    )

    type SummaryEntry = { quantity: number; schoolMeals: number }
    const summaryMap = new Map<string, SummaryEntry>()

    orders.forEach((order) => {
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

    const summaryData = Array.from(summaryMap.entries()).map(([key, data]) => {
      const [productName, customerItem] = key.split('|')
      return {
        'Product Name': productName,
        'Customer Item #': customerItem,
        Quantity: data.quantity,
        'Total School Meals': data.schoolMeals,
      }
    })

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(detailedData), 'Detailed Orders')
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summaryData), 'Distribution Summary')

    const filename = `spg-feed-orders-${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(wb, filename)
  }

  const totalMeals = orders.reduce(
    (sum, order) => sum + order.items.reduce((s, item) => s + item.school_meals, 0),
    0
  )

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
        <HelpIcon />
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">SPG FEED Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            <button type="submit" className="w-full btn-spg py-2 px-4 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      <HelpIcon />
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SPG FEED Order Management</h1>
              <p className="text-gray-600 mt-1">
                Total Orders: {orders.length} · School Meals: {totalMeals.toLocaleString('en-US')}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={loadOrders}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Refresh
              </button>
              <button
                onClick={exportToExcel}
                disabled={orders.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export to Excel
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">Loading orders...</div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">No orders yet</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product / Meals
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Shipping Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.order_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            {item.product_name}
                            {item.customer_item_number && ` [${item.customer_item_number}]`}
                            {' — '}
                            {item.school_meals} meals
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div>
                          {order.shipping_name}
                          <br />
                          {order.shipping_phone && (
                            <>
                              {order.shipping_phone}
                              <br />
                            </>
                          )}
                          {order.shipping_address}
                          <br />
                          {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
                          <br />
                          {order.shipping_country}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
