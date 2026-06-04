'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getSupabaseClient, getSupabaseErrorMessage, isSupabaseConfigured } from '@/lib/supabase'
import { Product } from '@/types'
import AdminExportButton from '@/components/AdminExportButton'
import HelpIcon from '@/components/HelpIcon'
import MealsCounter from '@/components/MealsCounter'
import { useLanguage } from '@/lib/languageContext'

export default function ProductPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProductId, setSelectedProductId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const accessGranted = sessionStorage.getItem('accessGranted')
    if (!accessGranted) {
      router.push('/')
      return
    }

    const saved = sessionStorage.getItem('product')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed?.productId) setSelectedProductId(parsed.productId)
      } catch {
        // ignore invalid session data
      }
    }

    loadProducts()
  }, [router])

  const loadProducts = async () => {
    if (!isSupabaseConfigured) {
      setError('Store is not connected to the database. Please contact support.')
      setLoading(false)
      return
    }

    try {
      const { data, error: fetchError } = await getSupabaseClient()
        .from('spg_feed_products')
        .select('*')
        .order('customer_item_number')

      if (fetchError) throw fetchError
      setProducts(data ?? [])
    } catch (e) {
      setError(
        `Failed to load products. ${getSupabaseErrorMessage(e)}`.trim()
      )
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    const selected = products.find((p) => p.id === selectedProductId)
    if (!selected) {
      setError(t('pleaseSelectProduct'))
      return
    }

    sessionStorage.setItem(
      'product',
      JSON.stringify({
        productId: selected.id,
        productName: selected.name,
        customer_item_number: selected.customer_item_number,
        school_meals_per_purchase: selected.school_meals_per_purchase,
        thumbnail_url: selected.thumbnail_url,
      })
    )

    router.push('/shipping')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">{t('loadingProducts')}</p>
      </div>
    )
  }

  return (
    <>
      <AdminExportButton />
      <HelpIcon />
      <div className="min-h-screen py-12 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-black mb-2">{t('selectProduct')}</h1>
            <p className="text-gray-600 mb-4">{t('chooseProduct')}</p>
            <MealsCounter variant="compact" />
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => {
              const isSelected = selectedProductId === product.id
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setSelectedProductId(product.id)
                    setError('')
                  }}
                  className={`text-left bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all hover:shadow-lg ${
                    isSelected ? 'border-black ring-2 ring-black ring-offset-2' : 'border-gray-200'
                  }`}
                >
                  <div className="aspect-square bg-gray-100 relative">
                    {product.thumbnail_url ? (
                      <img
                        src={product.thumbnail_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                    {isSelected && (
                      <span className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm leading-snug mb-2">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">{product.customer_item_number}</p>
                    <p className="text-sm font-medium text-black">
                      {t('providesMeals').replace(
                        '{count}',
                        String(product.school_meals_per_purchase)
                      )}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/program')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t('backToProgram')}
            </button>
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedProductId}
              className="btn-spg px-6 py-2 rounded-md font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t('continueShipping')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
