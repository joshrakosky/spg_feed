-- Montauk fleece jackets: sell $61.00 (SX-5 / SX-5W). unit_cost ~ prior margin.
UPDATE cestes_products SET unit_cost = 30.49, unit_sell = 61.00, price = 61.00 WHERE customer_item_number IN ('CES-FLEECE-MEN', 'CES-FLEECE-WOMEN');

-- Stormtech Sonora 1/4 Zip (CES-QZIP-MEN = FPL-3M, CES-QZIP-WOMEN = FPM-3W). Black + Ash. Sell $52.50.
-- If QZIP rows are missing from the app dropdown, run supabase-migration-ensure-qzip-sonora-products.sql.
-- Images: CES-QZIP-*_Black_Purple.jpg, _Black_White.jpg, _Ash_Purple.jpg, _Ash_White.jpg
INSERT INTO cestes_products (name, description, category, requires_color, requires_size, available_colors, available_sizes, customer_item_number, price) SELECT 'Stormtech Men''s Sonora 1/4 Zip Pullover', 'Stormtech men''s 1/4 zip; VB Spine logo purple or white.', 'product', true, true, ARRAY['Black', 'Ash'], ARRAY['S-5XL'], 'CES-QZIP-MEN', 52.50 WHERE NOT EXISTS (SELECT 1 FROM cestes_products WHERE customer_item_number = 'CES-QZIP-MEN');

INSERT INTO cestes_products (name, description, category, requires_color, requires_size, available_colors, available_sizes, customer_item_number, price) SELECT 'Stormtech Women''s Sonora 1/4 Zip Pullover', 'Stormtech women''s 1/4 zip; VB Spine logo purple or white.', 'product', true, true, ARRAY['Black', 'Ash'], ARRAY['XS-3XL'], 'CES-QZIP-WOMEN', 52.50 WHERE NOT EXISTS (SELECT 1 FROM cestes_products WHERE customer_item_number = 'CES-QZIP-WOMEN');

UPDATE cestes_products SET name = 'Stormtech Men''s Sonora 1/4 Zip Pullover', description = 'Stormtech men''s 1/4 zip; VB Spine logo purple or white.', available_colors = ARRAY['Black', 'Ash'], available_sizes = ARRAY['S-5XL'], vendor_item_num = 'FPL-3M', unit_cost = 26.23, unit_sell = 52.50, price = 52.50, logo_colors_available = 'Purple, White' WHERE customer_item_number = 'CES-QZIP-MEN';

UPDATE cestes_products SET name = 'Stormtech Women''s Sonora 1/4 Zip Pullover', description = 'Stormtech women''s 1/4 zip; VB Spine logo purple or white.', available_colors = ARRAY['Black', 'Ash'], available_sizes = ARRAY['XS-3XL'], vendor_item_num = 'FPM-3W', unit_cost = 26.23, unit_sell = 52.50, price = 52.50, logo_colors_available = 'Purple, White' WHERE customer_item_number = 'CES-QZIP-WOMEN';
