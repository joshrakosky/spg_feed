-- Update unit_cost, unit_sell, and price for products
-- Run in Supabase SQL Editor
-- Frontend uses 'price' for display and budget - must update it to reflect unit_sell

-- CES-VEST-MEN (Orbiter)
UPDATE cestes_products SET unit_cost = 34.57, unit_sell = 69.20, price = 69.20 WHERE customer_item_number = 'CES-VEST-MEN';

-- CES-VEST-WOMEN (Orbiter)
UPDATE cestes_products SET unit_cost = 34.57, unit_sell = 69.20, price = 69.20 WHERE customer_item_number = 'CES-VEST-WOMEN';

-- CES-CREW-MEN (Ashburn Crew)
UPDATE cestes_products SET unit_cost = 20, unit_sell = 51, price = 51 WHERE customer_item_number = 'CES-CREW-MEN';

-- CES-CREW-WOMEN (Ashburn Crew)
UPDATE cestes_products SET unit_cost = 20, unit_sell = 51, price = 51 WHERE customer_item_number = 'CES-CREW-WOMEN';

-- CES-FLEECE-MEN (Montauk)
UPDATE cestes_products SET unit_cost = 30.49, unit_sell = 61.00, price = 61.00 WHERE customer_item_number = 'CES-FLEECE-MEN';

-- CES-FLEECE-WOMEN (Montauk)
UPDATE cestes_products SET unit_cost = 30.49, unit_sell = 61.00, price = 61.00 WHERE customer_item_number = 'CES-FLEECE-WOMEN';

-- CES-HOODY-MEN
UPDATE cestes_products SET unit_cost = 38.16, unit_sell = 76.35, price = 76.35 WHERE customer_item_number = 'CES-HOODY-MEN';

-- CES-HOODY-WOMEN
UPDATE cestes_products SET unit_cost = 38.16, unit_sell = 76.35, price = 76.35 WHERE customer_item_number = 'CES-HOODY-WOMEN';

-- CES-QZIP-MEN (Sonora 1/4 Zip, FPL-3M)
UPDATE cestes_products SET unit_cost = 26.23, unit_sell = 52.50, price = 52.50 WHERE customer_item_number = 'CES-QZIP-MEN';

-- CES-QZIP-WOMEN (Sonora 1/4 Zip, FPM-3W)
UPDATE cestes_products SET unit_cost = 26.23, unit_sell = 52.50, price = 52.50 WHERE customer_item_number = 'CES-QZIP-WOMEN';

-- CES-TEE-MEN (Stockton Short Sleeve)
UPDATE cestes_products SET unit_cost = 11.88, unit_sell = 23.75, price = 23.75 WHERE customer_item_number = 'CES-TEE-MEN';

-- CES-TEE-WOMEN (Stockton Short Sleeve)
UPDATE cestes_products SET unit_cost = 11.88, unit_sell = 23.75, price = 23.75 WHERE customer_item_number = 'CES-TEE-WOMEN';

-- CES-BEANIE-VINTAGE (Stormtech Vintage Knit Beanie)
UPDATE cestes_products SET name = 'Stormtech Vintage Knit Beanie', unit_cost = 11.34, unit_sell = 23.35, price = 23.35 WHERE customer_item_number = 'CES-BEANIE-VINTAGE';

-- CES-BEANIE-NOVARRA (Stormtech Novarra Knit Beanie)
UPDATE cestes_products SET name = 'Stormtech Novarra Knit Beanie', unit_cost = 8.13, unit_sell = 16.75, price = 16.75 WHERE customer_item_number = 'CES-BEANIE-NOVARRA';

-- CES-GLOVES (Oasis Touch Screen Gloves)
UPDATE cestes_products SET unit_cost = 9.97, unit_sell = 21.75, price = 21.75 WHERE customer_item_number = 'CES-GLOVES';

-- CES-SCARF (Avalante Knit Scarf)
UPDATE cestes_products SET unit_cost = 9.69, unit_sell = 21.75, price = 21.75 WHERE customer_item_number = 'CES-SCARF';
