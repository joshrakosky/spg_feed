-- Swap Ashburn tees for Stockton Short Sleeve (vendor TSX-6M / TSX-6W).
-- Colors: Black, Granite. Sell $23.75. Run in Supabase SQL Editor after deploy.

UPDATE cestes_products
SET
  name = 'Stormtech Men''s Stockton Short Sleeve Tee',
  description = 'Short sleeve tee with VB Spine logo (purple or white).',
  available_colors = ARRAY['Black', 'Granite'],
  available_sizes = ARRAY['S-5XL'],
  vendor_item_num = 'TSX-6M',
  unit_cost = 11.88,
  unit_sell = 23.75,
  price = 23.75
WHERE customer_item_number = 'CES-TEE-MEN';

UPDATE cestes_products
SET
  name = 'Stormtech Women''s Stockton Short Sleeve Tee',
  description = 'Short sleeve tee with VB Spine logo (purple or white).',
  available_colors = ARRAY['Black', 'Granite'],
  available_sizes = ARRAY['S-5XL'],
  vendor_item_num = 'TSX-6W',
  unit_cost = 11.88,
  unit_sell = 23.75,
  price = 23.75
WHERE customer_item_number = 'CES-TEE-WOMEN';
