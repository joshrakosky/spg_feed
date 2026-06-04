# SPG FEED Program Store

Simon Property Group FEED program storefront. Each tote purchase helps provide school meals for children worldwide. Built with Next.js and Supabase.

## Features

- **Admin code access** — enter `admin` on the landing page
- **Program overview** — mission copy and live school-meals counter
- **6-product grid** — select one FEED tote with meals impact shown per product
- **Editable shipping** — users enter their own full shipping address
- **Order tracking** — `FEED-###` order numbers and confirmation flow
- **Admin export** — Excel export of orders with school meals data

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run [`migrations/supabase-schema-spg-feed.sql`](migrations/supabase-schema-spg-feed.sql) in the Supabase SQL Editor
3. Add credentials to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_ADMIN_PASSWORD` (optional, defaults to `admin` for `/admin` page)

### 3. Product images

Images are in `public/images/`:

- `FEED_Item1.jpg` … `FEED_Item6.jpg` — product thumbnails
- `simon-logo.jpg` — Simon Property Group logo
- `spg-emblem-black.png`, `spg-emblem-white.png` — animated login background

### 4. Run development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## User flow

1. `/` — enter admin code
2. `/program` — program info, meals counter, **Select Product**
3. `/product` — 3×3 tote grid, pick one, **Continue to Shipping**
4. `/shipping` — contact + address form
5. `/review` — confirm and submit
6. `/confirmation` — `FEED-###` order number

## Database tables

| Table | Purpose |
|-------|---------|
| `spg_feed_products` | 6 FEED totes with `school_meals_per_purchase` |
| `spg_feed_orders` | Order headers and shipping |
| `spg_feed_order_items` | Line items with `school_meals` snapshot |

## Admin

- **Floating export** — appears after logging in with `admin` on the landing page
- **`/admin`** — order list dashboard (password: `admin` or `NEXT_PUBLIC_ADMIN_PASSWORD`)
