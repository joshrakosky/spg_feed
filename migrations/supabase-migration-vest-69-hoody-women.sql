-- Orbiter softshell vests: sell price $69.20 (KSV-1 / KSV-1W).
-- unit_cost scaled from prior 57.55 sell / 28.75 cost ratio (~50%).
UPDATE cestes_products SET unit_cost = 34.57, unit_sell = 69.20, price = 69.20 WHERE customer_item_number IN ('CES-VEST-MEN', 'CES-VEST-WOMEN');

-- ---------------------------------------------------------------------------
-- Women's Ashburn Pullover Hoody (CES-HOODY-WOMEN / WK-3W)
-- INSERT if missing — prior scripts only UPDATE'd; no row = nothing in app dropdown.
-- Thumbnails: CES-HOODY-WOMEN_Black_Purple.jpg, CES-HOODY-WOMEN_Black_White.jpg
-- ---------------------------------------------------------------------------
INSERT INTO cestes_products (
  name,
  description,
  category,
  requires_color,
  requires_size,
  available_colors,
  available_sizes,
  customer_item_number,
  price
)
SELECT
  'Stormtech Women''s Ashburn Pullover Hoody',
  'Stormtech women''s pullover hoody; VB Spine logo in purple or white.',
  'product',
  true,
  true,
  ARRAY['Black'],
  ARRAY['XS-3XL'],
  'CES-HOODY-WOMEN',
  23.75
WHERE NOT EXISTS (
  SELECT 1 FROM cestes_products WHERE customer_item_number = 'CES-HOODY-WOMEN'
);

-- WHERE must scope to this SKU only (never all rows).
UPDATE cestes_products SET name = 'Stormtech Women''s Ashburn Pullover Hoody', description = 'Stormtech women''s pullover hoody; VB Spine logo in purple or white.', available_colors = ARRAY['Black'], available_sizes = ARRAY['XS-3XL'], vendor_item_num = 'WK-3W', unit_cost = 11.88, unit_sell = 23.75, price = 23.75, logo_colors_available = 'Purple, White' WHERE customer_item_number = 'CES-HOODY-WOMEN';
