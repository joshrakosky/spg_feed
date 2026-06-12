/**
 * Product specs for flip-card backs — keyed by customer_item_number (SKU).
 * Dimensions sourced from FEED product spec sheets.
 */

export interface ProductDimensionLine {
  label: string
  dimensions: string
}

export interface ProductDetailsSpec {
  dimensions: ProductDimensionLine[]
}

export const PRODUCT_DETAILS: Record<string, ProductDetailsSpec> = {
  'SPG-FEED-001': {
    dimensions: [
      { label: 'Convention Tote', dimensions: '16.5"H × 15.0"W × 0.50"D' },
      { label: 'Organic Cotton Pouch', dimensions: '6.50"H × 10.25"W × 3.00"D' },
    ],
  },
  'SPG-FEED-002': {
    dimensions: [
      { label: 'Book Tote', dimensions: '14"H × 13"W × 2.75"D' },
      { label: 'Organic Cotton Pouch', dimensions: '6.50"H × 10.25"W × 3.00"D' },
    ],
  },
  'SPG-FEED-003': {
    dimensions: [
      { label: 'Shopper Tote', dimensions: '14"H × 17.25"W × 5.5"D' },
      { label: 'Organic Cotton Pouch', dimensions: '6.50"H × 10.25"W × 3.00"D' },
    ],
  },
  'SPG-FEED-004': {
    dimensions: [{ label: 'Crossbody', dimensions: '8.0"H × 5.0"W × 2.2"D' }],
  },
  'SPG-FEED-005': {
    dimensions: [{ label: 'Zippered Tote', dimensions: '13.5"H × 19"W × 5"D' }],
  },
  'SPG-FEED-006': {
    dimensions: [{ label: 'Rivet Tote', dimensions: '13"H × 15"W × 5"D' }],
  },
}

export function getProductDetails(sku: string): ProductDetailsSpec | null {
  return PRODUCT_DETAILS[sku] ?? null
}
