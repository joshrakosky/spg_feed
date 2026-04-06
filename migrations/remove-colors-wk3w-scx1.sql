-- Remove discontinued colors: WK-3W (women's hoody) = Graphite; SCX-1 (scarf) = Charcoal / Charcoal Heather
-- Run in Supabase SQL Editor

-- WK-3W: Women's Ashburn Pullover Hoody — remove Graphite
UPDATE cestes_products
SET available_colors = array_remove(available_colors, 'Graphite')
WHERE customer_item_number = 'CES-HOODY-WOMEN'
   OR vendor_item_num = 'WK-3W';

-- SCX-1: Avalante Knit Scarf — remove Charcoal (both spellings if present)
UPDATE cestes_products
SET available_colors = array_remove(array_remove(available_colors, 'Charcoal Heather'), 'Charcoal')
WHERE customer_item_number = 'CES-SCARF'
   OR vendor_item_num = 'SCX-1';
