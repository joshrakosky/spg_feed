-- Prefix Stockton tee product names with Stormtech (run if DB already had pre-Stormtech names).
UPDATE cestes_products
SET name = 'Stormtech Men''s Stockton Short Sleeve Tee'
WHERE customer_item_number = 'CES-TEE-MEN';

UPDATE cestes_products
SET name = 'Stormtech Women''s Stockton Short Sleeve Tee'
WHERE customer_item_number = 'CES-TEE-WOMEN';
