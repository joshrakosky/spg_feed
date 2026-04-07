-- Montauk fleece (CES-FLEECE-MEN / CES-FLEECE-WOMEN): sell $61.00. Run in Supabase if price is still old in DB.
UPDATE cestes_products SET unit_cost = 30.49, unit_sell = 61.00, price = 61.00 WHERE customer_item_number IN ('CES-FLEECE-MEN', 'CES-FLEECE-WOMEN');
