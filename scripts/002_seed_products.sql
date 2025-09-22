-- Insert sample products for Orchard Elixir
INSERT INTO products (name, description, price_eur, price_inr, category, image_url, stock_quantity, featured) VALUES
-- Essential Oils
('Lavender Essential Oil', 'Pure cold-pressed lavender oil with calming properties. Perfect for relaxation and aromatherapy.', 24.99, 2099, 'essential_oils', '/placeholder.svg?height=400&width=400', 50, true),
('Eucalyptus Essential Oil', 'Refreshing eucalyptus oil known for its invigorating and cleansing properties.', 19.99, 1699, 'essential_oils', '/placeholder.svg?height=400&width=400', 45, true),
('Tea Tree Essential Oil', 'Premium tea tree oil with natural antiseptic and purifying qualities.', 22.99, 1949, 'essential_oils', '/placeholder.svg?height=400&width=400', 40, false),
('Peppermint Essential Oil', 'Cooling peppermint oil that energizes and refreshes the senses.', 21.99, 1869, 'essential_oils', '/placeholder.svg?height=400&width=400', 35, true),
('Rose Essential Oil', 'Luxurious rose oil with an exquisite floral fragrance, perfect for skincare.', 89.99, 7649, 'essential_oils', '/placeholder.svg?height=400&width=400', 15, true),
('Lemon Essential Oil', 'Bright and citrusy lemon oil that uplifts mood and purifies air.', 18.99, 1619, 'essential_oils', '/placeholder.svg?height=400&width=400', 60, false),

-- Premium Herbs
('Organic Chamomile Flowers', 'Hand-picked chamomile flowers perfect for teas and natural remedies.', 16.99, 1449, 'herbs', '/placeholder.svg?height=400&width=400', 30, false),
('Premium Ashwagandha Root', 'High-quality ashwagandha root powder for stress relief and vitality.', 29.99, 2549, 'herbs', '/placeholder.svg?height=400&width=400', 25, true),
('Organic Turmeric Powder', 'Golden turmeric powder with anti-inflammatory properties.', 14.99, 1279, 'herbs', '/placeholder.svg?height=400&width=400', 40, false),
('Holy Basil (Tulsi) Leaves', 'Sacred tulsi leaves known for their adaptogenic and healing properties.', 19.99, 1699, 'herbs', '/placeholder.svg?height=400&width=400', 35, false),
('Ginseng Root Extract', 'Premium ginseng root extract for energy and mental clarity.', 39.99, 3399, 'herbs', '/placeholder.svg?height=400&width=400', 20, true),

-- Signature Blends
('Royal Relaxation Blend', 'A luxurious blend of lavender, chamomile, and bergamot for ultimate relaxation.', 34.99, 2979, 'blends', '/placeholder.svg?height=400&width=400', 25, true),
('Energy Boost Blend', 'Invigorating blend of peppermint, eucalyptus, and rosemary to energize your day.', 32.99, 2809, 'blends', '/placeholder.svg?height=400&width=400', 30, true),
('Immunity Support Blend', 'Powerful blend of tea tree, lemon, and oregano to support natural immunity.', 36.99, 3149, 'blends', '/placeholder.svg?height=400&width=400', 20, false),
('Sleep Serenity Blend', 'Calming blend of lavender, ylang-ylang, and sandalwood for peaceful sleep.', 38.99, 3319, 'blends', '/placeholder.svg?height=400&width=400', 22, true);
