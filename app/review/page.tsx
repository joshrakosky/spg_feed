'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import AdminExportButton from '@/components/AdminExportButton'
import HelpIcon from '@/components/HelpIcon'
import MealsCounter from '@/components/MealsCounter'
import { useLanguage } from '@/lib/languageContext'
import { SelectedProduct } from '@/types'
import { invalidateProgramMealsTotal } from '@/lib/mealsTotal'

export default function ReviewPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [product, setProduct] = useState<SelectedProduct | null>(null)
  const [shipping, setShipping] = useState<Record<string, string> | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const email = sessionStorage.getItem('orderEmail')
    const productData = sessionStorage.getItem('product')
    const shippingData = sessionStorage.getItem('shipping')

    if (!email || !productData || !shippingData) {
      router.push('/')
      return
    }

    try {
      setProduct(JSON.parse(productData))
      setShipping(JSON.parse(shippingData))
    } catch {
      router.push('/')
      return
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleSubmit = async () => {
    setError('')
    setSubmitting(true)

    try {
      const email = sessionStorage.getItem('orderEmail')!

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          shipping,
          product,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit order')
      }

      const orderData = await response.json()

      sessionStorage.setItem('orderNumber', orderData.order_number)
      sessionStorage.setItem('orderMeals', String(orderData.school_meals ?? product?.school_meals_per_purchase ?? 0))

      invalidateProgramMealsTotal()

      sessionStorage.removeItem('product')
      sessionStorage.removeItem('shipping')

      router.push('/confirmation')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit order. Please try again.'
      setError(message)
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <AdminExportButton />
      <HelpIcon />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 text-center">
            <MealsCounter variant="compact" />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('reviewOrder')}</h1>
              <p className="text-gray-600">{t('reviewInfo')}</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}

            <div className="mb-6 pb-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('selectedProduct')}</h2>
              {product && (
                <div className="bg-gray-50 rounded-lg p-4 flex gap-4">
                  {product.thumbnail_url && (
                    <img
                      src={product.thumbnail_url}
                      alt={product.productName}
                      className="w-24 h-24 object-cover rounded-md border border-gray-200"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{product.productName}</p>
                    <p className="text-sm text-gray-500">{product.customer_item_number}</p>
                    <p className="text-sm font-medium text-black mt-2">
                      {t('providesMeals').replace(
                        '{count}',
                        String(product.school_meals_per_purchase)
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6 pb-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('shippingInfo')}</h2>
              {shipping && (
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 space-y-1">
                  <p className="font-medium text-gray-900">{shipping.email}</p>
                  <p>{shipping.name}</p>
                  {shipping.phone && <p>{shipping.phone}</p>}
                  <p>{shipping.address}</p>
                  {shipping.address2 && <p>{shipping.address2}</p>}
                  <p>
                    {shipping.city}, {shipping.state} {shipping.zip}
                  </p>
                  <p>{shipping.country}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => router.push('/shipping')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-spg px-6 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t('submitting') : t('submitOrder')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
