// Type definitions for SPG FEED program

export interface Product {
  id: string
  name: string
  description?: string
  thumbnail_url?: string
  customer_item_number: string
  school_meals_per_purchase: number
  price?: number | null
  created_at: string
}

export interface Order {
  id: string
  email: string
  order_number: string
  shipping_name: string
  shipping_phone?: string
  shipping_address: string
  shipping_address2?: string
  shipping_city: string
  shipping_state: string
  shipping_zip: string
  shipping_country: string
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  customer_item_number?: string
  school_meals: number
  created_at: string
}

export interface OrderWithItems extends Order {
  items: OrderItem[]
}

/** Selected product stored in sessionStorage during checkout */
export interface SelectedProduct {
  productId: string
  productName: string
  customer_item_number: string
  school_meals_per_purchase: number
  thumbnail_url?: string
}
