-- Ashburn pullover hoodies (men + women): sell $23.75. unit_cost ~50% margin (aligned with Stockton tee tier).
UPDATE cestes_products SET unit_cost = 11.88, unit_sell = 23.75, price = 23.75 WHERE customer_item_number IN ('CES-HOODY-MEN', 'CES-HOODY-WOMEN');
