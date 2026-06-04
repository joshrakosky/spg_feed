import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { SelectedProduct } from '@/types'

// Generate unique order number in format FEED-001, FEED-002, etc.
async function generateOrderNumber(): Promise<string> {
  const { data: orders, error } = await supabase
    .from('spg_feed_orders')
    .select('order_number')
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    console.error('Error fetching orders:', error)
    return 'FEED-001'
  }

  if (!orders || orders.length === 0) {
    return 'FEED-001'
  }

  const lastOrderNumber = orders[0].order_number
  const match = lastOrderNumber.match(/FEED-(\d+)/i)

  if (match) {
    const lastNumber = parseInt(match[1], 10)
    const nextNumber = lastNumber + 1
    return `FEED-${String(nextNumber).padStart(3, '0')}`
  }

  return 'FEED-001'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, shipping, product } = body

    if (!email || !shipping || !product) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const selectedProduct = product as SelectedProduct

    if (!selectedProduct.productId) {
      return NextResponse.json(
        { error: 'Invalid product selection' },
        { status: 400 }
      )
    }

    const orderNumber = await generateOrderNumber()

    const { data: order, error: orderError } = await supabase
      .from('spg_feed_orders')
      .insert({
        email: email.toLowerCase(),
        order_number: orderNumber,
        shipping_name: shipping.name,
        shipping_phone: shipping.phone || null,
        shipping_address: shipping.address,
        shipping_address2: shipping.address2 || null,
        shipping_city: shipping.city,
        shipping_state: shipping.state,
        shipping_zip: shipping.zip,
        shipping_country: shipping.country || 'USA',
      })
      .select()
      .single()

    if (orderError) throw orderError

    const { data: productData, error: productError } = await supabase
      .from('spg_feed_products')
      .select('name, customer_item_number, school_meals_per_purchase')
      .eq('id', selectedProduct.productId)
      .single()

    if (productError || !productData) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 400 }
      )
    }

    const schoolMeals =
      productData.school_meals_per_purchase ??
      selectedProduct.school_meals_per_purchase ??
      0

    const { error: itemsError } = await supabase
      .from('spg_feed_order_items')
      .insert({
        order_id: order.id,
        product_id: selectedProduct.productId,
        product_name: selectedProduct.productName || productData.name,
        customer_item_number: productData.customer_item_number || selectedProduct.customer_item_number,
        school_meals: schoolMeals,
      })

    if (itemsError) throw itemsError

    return NextResponse.json({
      success: true,
      order_number: orderNumber,
      order_id: order.id,
      school_meals: schoolMeals,
    })
  } catch (error: unknown) {
    console.error('Order creation error:', error)
    const message = error instanceof Error ? error.message : 'Failed to create order'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
