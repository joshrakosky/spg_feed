'use client'

import { Product } from '@/types'

interface ProductFlipCardProps {
  product: Product
  isSelected: boolean
  isFlipped: boolean
  onSelect: () => void
  onToggleFlip: () => void
  t: (key: string) => string
}

function DetailsIcon() {
  // Document lines — reads as product specs, not an info/eye icon
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

/**
 * Selectable product card with flip-to-details (description, sizes, dimensions).
 */
export default function ProductFlipCard({
  product,
  isSelected,
  isFlipped,
  onSelect,
  onToggleFlip,
  t,
}: ProductFlipCardProps) {
  return (
    <div
      className={`product-flip-card rounded-lg shadow-md border-2 transition-shadow hover:shadow-lg ${
        isSelected ? 'border-black ring-2 ring-black ring-offset-2' : 'border-gray-200'
      } ${isFlipped ? 'is-flipped' : ''}`}
    >
      <div className="product-flip-inner">
        {/* Front — product image, name, meals */}
        <div className="product-flip-face product-flip-front relative bg-white rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={onSelect}
            className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset"
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
            <div className="p-4 pr-12">
              <p className="font-semibold text-gray-900 text-sm leading-snug mb-2">{product.name}</p>
              <p className="text-sm font-medium text-black">
                {t('providesMeals').replace('{count}', String(product.school_meals_per_purchase))}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFlip()
            }}
            className="btn-product-details absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-label={t('viewProductDetails')}
            title={t('viewProductDetails')}
          >
            <DetailsIcon />
          </button>
        </div>

        {/* Back — description, sizes, dimensions (TBD until product data is finalized) */}
        <div className="product-flip-face product-flip-back bg-white rounded-lg border border-gray-200 p-4 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-sm text-gray-900 leading-snug">{product.name}</h3>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFlip()
              }}
              className="shrink-0 w-8 h-8 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
              aria-label={t('backToProductCard')}
              title={t('backToProductCard')}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 space-y-3 text-sm text-gray-700 overflow-y-auto">
            <div>
              <p className="font-medium text-black mb-1">{t('productDescription')}</p>
              <p>{product.description || t('tbd')}</p>
            </div>
            <div>
              <p className="font-medium text-black mb-1">{t('productSizes')}</p>
              <p>{t('tbd')}</p>
            </div>
            <div>
              <p className="font-medium text-black mb-1">{t('productDimensions')}</p>
              <p>{t('tbd')}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onSelect}
            className={`mt-4 w-full py-2 rounded-md text-sm font-medium border ${
              isSelected
                ? 'bg-black text-white border-black'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isSelected ? t('selected') : t('selectThisProduct')}
          </button>
        </div>
      </div>
    </div>
  )
}
