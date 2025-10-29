// Реальные Telegram NFT Подарки из Fragment/Portals (70 штук)
// Распределение: 50 дешевых (50-1000₽), 15 средних (1000-10000₽), 5 дорогих (10000₽+)

const products = [
    // ========== ДЕШЕВЫЕ ПОДАРКИ (50 штук) 50-1000₽ ==========
    
    // Звезды (Stars) - самые дешевые и распространенные
    { id: 1, name: 'Green Star', price: 150, icon: '⭐', image: 'Подарки/загруженное (18).png', description: 'Collectible #3421', specs: { Model: 'Star 8%', Backdrop: 'Green 15%', Symbol: 'Shine 3%' } },
    { id: 2, name: 'Blue Star', price: 160, icon: '⭐', image: 'Подарки/загруженное (7).png', description: 'Collectible #5234', specs: { Model: 'Star 8%', Backdrop: 'Blue 16%', Symbol: 'Sparkle 4%' } },
    { id: 3, name: 'Red Star', price: 170, icon: '⭐', image: 'Подарки/загруженное (25).png', description: 'Collectible #4567', specs: { Model: 'Star 8%', Backdrop: 'Red 14%', Symbol: 'Glow 3%' } },
    { id: 4, name: 'Yellow Star', price: 165, icon: '⭐', image: 'Подарки/загруженное (12).png', description: 'Collectible #6123', specs: { Model: 'Star 8%', Backdrop: 'Yellow 15%', Symbol: 'Light 4%' } },
    { id: 5, name: 'Pink Star', price: 155, icon: '⭐', image: 'Подарки/загруженное (31).png', description: 'Collectible #5891', specs: { Model: 'Star 8%', Backdrop: 'Pink 17%', Symbol: 'Hearts 5%' } },
    { id: 6, name: 'Purple Star', price: 175, icon: '⭐', image: 'Подарки/загруженное (4).png', description: 'Collectible #4890', specs: { Model: 'Star 8%', Backdrop: 'Purple 14%', Symbol: 'Magic 3%' } },
    { id: 7, name: 'Orange Star', price: 160, icon: '⭐', image: 'Подарки/загруженное (22).png', description: 'Collectible #5678', specs: { Model: 'Star 8%', Backdrop: 'Orange 15%', Symbol: 'Fire 4%' } },
    { id: 8, name: 'White Star', price: 180, icon: '⭐', image: 'Подарки/загруженное (15).png', description: 'Collectible #4321', specs: { Model: 'Star 8%', Backdrop: 'White 13%', Symbol: 'Snow 3%' } },
    
    // Воздушные шары (Balloons)
    { id: 9, name: 'Red Balloon', price: 220, icon: '🎈', image: 'Подарки/загруженное (9).png', description: 'Collectible #3456', specs: { Model: 'Balloon 12%', Backdrop: 'Red 18%', Symbol: 'String 6%' } },
    { id: 10, name: 'Blue Balloon', price: 210, icon: '🎈', image: 'Подарки/загруженное (28).png', description: 'Collectible #3789', specs: { Model: 'Balloon 12%', Backdrop: 'Blue 19%', Symbol: 'Clouds 7%' } },
    { id: 11, name: 'Green Balloon', price: 215, icon: '🎈', image: 'Подарки/загруженное (3).png', description: 'Collectible #3234', specs: { Model: 'Balloon 12%', Backdrop: 'Green 18%', Symbol: 'Wind 6%' } },
    { id: 12, name: 'Yellow Balloon', price: 225, icon: '🎈', image: 'Подарки/загруженное (20).png', description: 'Collectible #3567', specs: { Model: 'Balloon 12%', Backdrop: 'Yellow 17%', Symbol: 'Sun 5%' } },
    { id: 13, name: 'Pink Balloon', price: 205, icon: '🎈', image: 'Подарки/загруженное (11).png', description: 'Collectible #3891', specs: { Model: 'Balloon 12%', Backdrop: 'Pink 20%', Symbol: 'Hearts 8%' } },
    
    // Сердечки (Hearts)
    { id: 14, name: 'Red Heart', price: 280, icon: '❤️', image: 'Подарки/загруженное (26).png', description: 'Collectible #2345', specs: { Model: 'Heart 10%', Backdrop: 'Red 14%', Symbol: 'Love 4%' } },
    { id: 15, name: 'Pink Heart', price: 270, icon: '💖', image: 'Подарки/загруженное (14).png', description: 'Collectible #2567', specs: { Model: 'Heart 10%', Backdrop: 'Pink 16%', Symbol: 'Sparkle 5%' } },
    { id: 16, name: 'Blue Heart', price: 275, icon: '💙', image: 'Подарки/загруженное (6).png', description: 'Collectible #2456', specs: { Model: 'Heart 10%', Backdrop: 'Blue 15%', Symbol: 'Ice 4%' } },
    { id: 17, name: 'Purple Heart', price: 285, icon: '💜', image: 'Подарки/загруженное (30).png', description: 'Collectible #2678', specs: { Model: 'Heart 10%', Backdrop: 'Purple 13%', Symbol: 'Magic 3%' } },
    { id: 18, name: 'Green Heart', price: 265, icon: '💚', image: 'Подарки/загруженное (19).png', description: 'Collectible #2789', specs: { Model: 'Heart 10%', Backdrop: 'Green 17%', Symbol: 'Nature 6%' } },
    
    // Подарочные коробки (Gift Boxes)
    { id: 19, name: 'Red Gift Box', price: 310, icon: '🎁', image: 'Подарки/загруженное (8).png', description: 'Collectible #2123', specs: { Model: 'Gift Box 9%', Backdrop: 'Red 13%', Symbol: 'Ribbon 4%' } },
    { id: 20, name: 'Blue Gift Box', price: 300, icon: '🎁', image: 'Подарки/загруженное (23).png', description: 'Collectible #2234', specs: { Model: 'Gift Box 9%', Backdrop: 'Blue 14%', Symbol: 'Bow 5%' } },
    { id: 21, name: 'Green Gift Box', price: 305, icon: '🎁', image: 'Подарки/загруженное (1).png', description: 'Collectible #2345', specs: { Model: 'Gift Box 9%', Backdrop: 'Green 13%', Symbol: 'Stars 4%' } },
    { id: 22, name: 'Purple Gift Box', price: 315, icon: '🎁', image: 'Подарки/загруженное (17).png', description: 'Collectible #2456', specs: { Model: 'Gift Box 9%', Backdrop: 'Purple 12%', Symbol: 'Shine 3%' } },
    
    // Цветы (Flowers)
    { id: 23, name: 'Red Rose', price: 350, icon: '🌹', image: 'Подарки/загруженное (29).png', description: 'Collectible #1890', specs: { Model: 'Rose 7%', Backdrop: 'Red 11%', Symbol: 'Petals 3%' } },
    { id: 24, name: 'Pink Rose', price: 340, icon: '🌹', image: 'Подарки/загруженное (10).png', description: 'Collectible #1945', specs: { Model: 'Rose 7%', Backdrop: 'Pink 12%', Symbol: 'Fragrance 4%' } },
    { id: 25, name: 'White Rose', price: 360, icon: '🌹', image: 'Подарки/загруженное (5).png', description: 'Collectible #1823', specs: { Model: 'Rose 7%', Backdrop: 'White 10%', Symbol: 'Snow 2%' } },
    { id: 26, name: 'Sunflower', price: 380, icon: '🌻', image: 'Подарки/загруженное (21).png', description: 'Collectible #1678', specs: { Model: 'Sunflower 6%', Backdrop: 'Yellow 9%', Symbol: 'Sun 2%' } },
    { id: 27, name: 'Cherry Blossom', price: 390, icon: '🌸', image: 'Подарки/загруженное (16).png', description: 'Collectible #1567', specs: { Model: 'Cherry Blossom 6%', Backdrop: 'Pink 8%', Symbol: 'Spring 2%' } },
    { id: 28, name: 'Tulip', price: 370, icon: '🌷', image: 'Подарки/загруженное.png', description: 'Collectible #1734', specs: { Model: 'Tulip 7%', Backdrop: 'Garden 10%', Symbol: 'Leaves 3%' } },
    
    // Сладости (Sweets)
    { id: 29, name: 'Candy', price: 420, icon: '🍬', image: 'Подарки/загруженное (13).png', description: 'Collectible #1456', specs: { Model: 'Candy 11%', Backdrop: 'Sweet 16%', Symbol: 'Wrapper 5%' } },
    { id: 30, name: 'Lollipop', price: 430, icon: '🍭', image: 'Подарки/загруженное (27).png', description: 'Collectible #1389', specs: { Model: 'Lollipop 10%', Backdrop: 'Rainbow 15%', Symbol: 'Stick 4%' } },
    { id: 31, name: 'Cookie', price: 410, icon: '🍪', image: 'Подарки/загруженное (2).png', description: 'Collectible #1523', specs: { Model: 'Cookie 11%', Backdrop: 'Chocolate 17%', Symbol: 'Chips 6%' } },
    { id: 32, name: 'Cupcake', price: 450, icon: '🧁', image: 'Подарки/загруженное (24).png', description: 'Collectible #1345', specs: { Model: 'Cupcake 9%', Backdrop: 'Pink 14%', Symbol: 'Cherry 3%' } },
    { id: 33, name: 'Donut', price: 440, icon: '🍩', image: 'Подарки/загруженное (32).png', description: 'Collectible #1412', specs: { Model: 'Donut 10%', Backdrop: 'Glazed 15%', Symbol: 'Sprinkles 5%' } },
    
    // Фрукты (Fruits)
    { id: 34, name: 'Strawberry', price: 480, icon: '🍓', image: 'Подарки/загруженное (11).png', description: 'Collectible #1234', specs: { Model: 'Strawberry 8%', Backdrop: 'Fresh 12%', Symbol: 'Green Leaf 3%' } },
    { id: 35, name: 'Watermelon', price: 490, icon: '🍉', image: 'Подарки/загруженное (6).png', description: 'Collectible #1178', specs: { Model: 'Watermelon 9%', Backdrop: 'Summer 13%', Symbol: 'Seeds 4%' } },
    { id: 36, name: 'Peach', price: 470, icon: '🍑', image: 'Подарки/загруженное (20).png', description: 'Collectible #1289', specs: { Model: 'Peach 8%', Backdrop: 'Sweet 12%', Symbol: 'Fuzz 3%' } },
    { id: 37, name: 'Pineapple', price: 500, icon: '🍍', image: 'Подарки/загруженное (15).png', description: 'Collectible #1156', specs: { Model: 'Pineapple 7%', Backdrop: 'Tropical 11%', Symbol: 'Crown 2%' } },
    
    // Праздничные (Party)
    { id: 38, name: 'Party Popper', price: 550, icon: '🎉', image: 'Подарки/загруженное (3).png', description: 'Collectible #1023', specs: { Model: 'Party Popper 6%', Backdrop: 'Confetti 9%', Symbol: 'Celebration 2%' } },
    { id: 39, name: 'Confetti Ball', price: 540, icon: '🎊', image: 'Подарки/загруженное (22).png', description: 'Collectible #1067', specs: { Model: 'Confetti Ball 6%', Backdrop: 'Party 10%', Symbol: 'Colors 3%' } },
    { id: 40, name: 'Sparkles', price: 560, icon: '✨', image: 'Подарки/загруженное (9).png', description: 'Collectible #989', specs: { Model: 'Sparkles 5%', Backdrop: 'Magic 8%', Symbol: 'Stars 1.5%' } },
    
    // Еда (Food)
    { id: 41, name: 'Pizza Slice', price: 620, icon: '🍕', image: 'Подарки/загруженное (31).png', description: 'Collectible #876', specs: { Model: 'Pizza 5%', Backdrop: 'Italian 7%', Symbol: 'Cheese 1.5%' } },
    { id: 42, name: 'Hot Dog', price: 590, icon: '🌭', image: 'Подарки/загруженное (14).png', description: 'Collectible #923', specs: { Model: 'Hot Dog 6%', Backdrop: 'Classic 8%', Symbol: 'Mustard 2%' } },
    { id: 43, name: 'Burger', price: 630, icon: '🍔', image: 'Подарки/загруженное (27).png', description: 'Collectible #845', specs: { Model: 'Burger 5%', Backdrop: 'Fast Food 7%', Symbol: 'Lettuce 1.5%' } },
    { id: 44, name: 'French Fries', price: 600, icon: '🍟', image: 'Подарки/загруженное (8).png', description: 'Collectible #901', specs: { Model: 'French Fries 6%', Backdrop: 'Golden 8%', Symbol: 'Salt 2%' } },
    
    // Напитки (Drinks)
    { id: 45, name: 'Coffee', price: 680, icon: '☕', image: 'Подарки/загруженное (19).png', description: 'Collectible #789', specs: { Model: 'Coffee 5%', Backdrop: 'Morning 7%', Symbol: 'Steam 1.5%' } },
    { id: 46, name: 'Tea Cup', price: 670, icon: '🍵', image: 'Подарки/загруженное (4).png', description: 'Collectible #812', specs: { Model: 'Tea 5%', Backdrop: 'Zen 7%', Symbol: 'Leaf 1.5%' } },
    { id: 47, name: 'Cocktail', price: 720, icon: '🍹', image: 'Подарки/загруженное (26).png', description: 'Collectible #756', specs: { Model: 'Cocktail 4%', Backdrop: 'Tropical 6%', Symbol: 'Umbrella 1%' } },
    
    // Прочие дешевые
    { id: 48, name: 'Avocado', price: 750, icon: '🥑', image: 'Подарки/загруженное (12).png', description: 'Collectible #723', specs: { Model: 'Avocado 5%', Backdrop: 'Healthy 7%', Symbol: 'Pit 1.5%' } },
    { id: 49, name: 'Ice Cream', price: 780, icon: '🍦', image: 'Подарки/загруженное (30).png', description: 'Collectible #698', specs: { Model: 'Ice Cream 4%', Backdrop: 'Sweet 6%', Symbol: 'Cone 1%' } },
    { id: 50, name: 'Delicious Cake', price: 850, icon: '🎂', image: 'Подарки/загруженное (1).png', description: 'Collectible #645', specs: { Model: 'Delicious Cake 4%', Backdrop: 'Party 6%', Symbol: 'Candles 1%' } },
    
    // ========== СРЕДНИЕ ПОДАРКИ (15 штук) 1000-10000₽ ==========
    
    { id: 51, name: 'Heart Locket', price: 12734, icon: '💝', image: 'Подарки/загруженное (17).png', description: 'Collectible #875', specs: { Model: 'Heart Locket 3.5%', Backdrop: 'Gold Pattern 5%', Symbol: 'Chain 0.8%' } },
    { id: 52, name: 'Loot Bag', price: 11111, icon: '💰', image: 'Подарки/загруженное (5).png', description: 'Collectible #11217', specs: { Model: 'Loot Bag 3%', Backdrop: 'Gold 4.5%', Symbol: 'Coins 0.7%' } },
    { id: 53, name: 'Ghost', price: 4200, icon: '👻', image: 'Подарки/загруженное (23).png', description: 'Collectible #523', specs: { Model: 'Ghost 3%', Backdrop: 'Spooky 4%', Symbol: 'Chains 0.6%' } },
    { id: 54, name: 'Fire', price: 5800, icon: '🔥', image: 'Подарки/загруженное (10).png', description: 'Collectible #412', specs: { Model: 'Fire 2.5%', Backdrop: 'Flames 3.5%', Symbol: 'Smoke 0.5%' } },
    { id: 55, name: 'Lightning', price: 4500, icon: '⚡', image: 'Подарки/загруженное (28).png', description: 'Collectible #489', specs: { Model: 'Lightning 3%', Backdrop: 'Storm 4%', Symbol: 'Thunder 0.6%' } },
    { id: 56, name: 'Rainbow', price: 6200, icon: '🌈', image: 'Подарки/загруженное (16).png', description: 'Collectible #356', specs: { Model: 'Rainbow 2.5%', Backdrop: 'Sky 3.5%', Symbol: 'Clouds 0.5%' } },
    { id: 57, name: 'Disco Ball', price: 7100, icon: '🪩', image: 'Подарки/загруженное (7).png', description: 'Collectible #298', specs: { Model: 'Disco Ball 2%', Backdrop: 'Party 3%', Symbol: 'Lights 0.4%' } },
    { id: 58, name: 'Fireworks', price: 5500, icon: '🎆', image: 'Подарки/загруженное (21).png', description: 'Collectible #423', specs: { Model: 'Fireworks 2.5%', Backdrop: 'Night 3.5%', Symbol: 'Sparks 0.5%' } },
    { id: 59, name: 'Trophy', price: 6800, icon: '🏆', image: 'Подарки/загруженное (13).png', description: 'Collectible #334', specs: { Model: 'Trophy 2.5%', Backdrop: 'Gold 3.5%', Symbol: 'Winner 0.5%' } },
    { id: 60, name: 'Crown', price: 8500, icon: '👑', image: 'Подарки/загруженное (29).png', description: 'Collectible #267', specs: { Model: 'Crown 2%', Backdrop: 'Royal 3%', Symbol: 'Jewels 0.4%' } },
    { id: 61, name: 'Rocket', price: 7800, icon: '🚀', image: 'Подарки/загруженное (2).png', description: 'Collectible #289', specs: { Model: 'Rocket 2%', Backdrop: 'Space 3%', Symbol: 'Stars 0.4%' } },
    { id: 62, name: 'Christmas Tree', price: 6500, icon: '🎄', image: 'Подарки/загруженное (24).png', description: 'Collectible #378', specs: { Model: 'Christmas Tree 2.5%', Backdrop: 'Snow 3.5%', Symbol: 'Star 0.5%' } },
    { id: 63, name: 'Snowflake', price: 5900, icon: '❄️', image: 'Подарки/загруженное (18).png', description: 'Collectible #412', specs: { Model: 'Snowflake 2.5%', Backdrop: 'Ice 3.5%', Symbol: 'Crystal 0.5%' } },
    { id: 64, name: 'Pumpkin', price: 5200, icon: '🎃', image: 'Подарки/загруженное (32).png', description: 'Collectible #456', specs: { Model: 'Pumpkin 2.5%', Backdrop: 'Halloween 3.5%', Symbol: 'Candle 0.5%' } },
    { id: 65, name: 'Four Leaf Clover', price: 9200, icon: '🍀', image: 'Подарки/загруженное.png', description: 'Collectible #189', specs: { Model: 'Four Leaf Clover 1.5%', Backdrop: 'Luck 2%', Symbol: 'Gold 0.3%' } },
    
    // ========== ДОРОГИЕ ПОДАРКИ (5 штук) 10000₽+ ==========
    
    { id: 66, name: 'Plush Pepe', price: 48000, icon: '🐸', image: 'Подарки/загруженное (25).png', description: 'Collectible #1515', specs: { Model: 'Pepe La Rana 0.7%', Backdrop: 'Purple 1.5%', Symbol: 'Rainbow 0.3%' } },
    { id: 67, name: 'Plush Pepe', price: 30000, icon: '🐸', image: 'Подарки/загруженное (9).png', description: 'Collectible #2658', specs: { Model: 'Pepe La Rana 0.7%', Backdrop: 'Black 2%', Symbol: 'Shine 0.4%' } },
    { id: 68, name: 'Plush Pepe', price: 15000, icon: '🐸', image: 'Подарки/загруженное (14).png', description: 'Collectible #858', specs: { Model: 'Pepe La Rana 0.7%', Backdrop: 'Purple 1.5%', Symbol: 'Pink 0.3%' } },
    { id: 69, name: 'Plush Pepe', price: 12345, icon: '🐸', image: 'Подарки/загруженное (22).png', description: 'Collectible #1609', specs: { Model: 'Pepe La Rana 0.7%', Backdrop: 'Orange 2%', Symbol: 'Sold 0.4%' } },
    { id: 70, name: 'Plush Pepe', price: 11888, icon: '🐸', image: 'Подарки/загруженное (31).png', description: 'Collectible #289', specs: { Model: 'Pepe La Rana 0.7%', Backdrop: 'Red 2.2%', Symbol: 'Star 0.4%' } },
];

