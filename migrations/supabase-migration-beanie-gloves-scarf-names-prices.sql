-- Beanie / gloves / scarf display names and sell prices (run in Supabase SQL Editor).
-- unit_cost scaled from prior sell/cost ratios (~48–50%).

UPDATE cestes_products SET name = 'Stormtech Vintage Knit Beanie', unit_cost = 11.34, unit_sell = 23.35, price = 23.35 WHERE customer_item_number = 'CES-BEANIE-VINTAGE';

UPDATE cestes_products SET name = 'Stormtech Novarra Knit Beanie', unit_cost = 8.13, unit_sell = 16.75, price = 16.75 WHERE customer_item_number = 'CES-BEANIE-NOVARRA';

UPDATE cestes_products SET unit_cost = 9.97, unit_sell = 21.75, price = 21.75 WHERE customer_item_number = 'CES-GLOVES';

UPDATE cestes_products SET unit_cost = 9.69, unit_sell = 21.75, price = 21.75 WHERE customer_item_number = 'CES-SCARF';
