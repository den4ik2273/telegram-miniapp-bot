// Реальные Telegram NFT Подарки из Fragment/Portals (70 штук)
// Распределение: 50 дешевых (50-1000₽), 15 средних (1000-10000₽), 5 дорогих (10000₽+)

const products = [
    // ========== ДЕШЕВЫЕ ПОДАРКИ (50 штук) 50-1000₽ ==========
    
    // Звезды (Stars) - самые дешевые и распространенные
    { id: 1, name: 'Green Star', price: 150, icon: '⭐', image: 'Подарки/загруженное (18).png', description: 'Collectible #3421', specs: { Model: 'Green Star', Backdrop: 'Emerald 45%', Issued: '3,421/10,000' } },
    { id: 2, name: 'Blue Star', price: 160, icon: '⭐', image: 'Подарки/загруженное (7).png', description: 'Collectible #5234', specs: { Model: 'Blue Star', Backdrop: 'Ocean 42%', Issued: '5,234/10,000' } },
    { id: 3, name: 'Red Star', price: 170, icon: '⭐', image: 'Подарки/загруженное (25).png', description: 'Collectible #4567', specs: { Model: 'Red Star', Backdrop: 'Crimson 40%', Issued: '4,567/10,000' } },
    { id: 4, name: 'Yellow Star', price: 165, icon: '⭐', image: 'Подарки/загруженное (12).png', description: 'Collectible #6123', specs: { Model: 'Yellow Star', Backdrop: 'Gold 43%', Issued: '6,123/10,000' } },
    { id: 5, name: 'Pink Star', price: 155, icon: '⭐', image: 'Подарки/загруженное (31).png', description: 'Collectible #5891', specs: { Model: 'Pink Star', Backdrop: 'Rose 44%', Issued: '5,891/10,000' } },
    { id: 6, name: 'Purple Star', price: 175, icon: '⭐', image: 'Подарки/загруженное (4).png', description: 'Collectible #4890', specs: { Model: 'Purple Star', Backdrop: 'Violet 41%', Issued: '4,890/10,000' } },
    { id: 7, name: 'Orange Star', price: 160, icon: '⭐', image: 'Подарки/загруженное (22).png', description: 'Collectible #5678', specs: { Model: 'Orange Star', Backdrop: 'Sunset 42%', Issued: '5,678/10,000' } },
    { id: 8, name: 'White Star', price: 180, icon: '⭐', image: 'Подарки/загруженное (15).png', description: 'Collectible #4321', specs: { Model: 'White Star', Backdrop: 'Snow 39%', Issued: '4,321/10,000' } },
    
    // Воздушные шары (Balloons)
    { id: 9, name: 'Red Balloon', price: 220, icon: '🎈', image: 'Подарки/загруженное (9).png', description: 'Collectible #3456', specs: { Model: 'Balloon', Backdrop: 'Red 35%', Issued: '3,456/8,000' } },
    { id: 10, name: 'Blue Balloon', price: 210, icon: '🎈', image: 'Подарки/загруженное (28).png', description: 'Collectible #3789', specs: { Model: 'Balloon', Backdrop: 'Blue 36%', Issued: '3,789/8,000' } },
    { id: 11, name: 'Green Balloon', price: 215, icon: '🎈', image: 'Подарки/загруженное (3).png', description: 'Collectible #3234', specs: { Model: 'Balloon', Backdrop: 'Green 35%', Issued: '3,234/8,000' } },
    { id: 12, name: 'Yellow Balloon', price: 225, icon: '🎈', image: 'Подарки/загруженное (20).png', description: 'Collectible #3567', specs: { Model: 'Balloon', Backdrop: 'Yellow 34%', Issued: '3,567/8,000' } },
    { id: 13, name: 'Pink Balloon', price: 205, icon: '🎈', image: 'Подарки/загруженное (11).png', description: 'Collectible #3891', specs: { Model: 'Balloon', Backdrop: 'Pink 37%', Issued: '3,891/8,000' } },
    
    // Сердечки (Hearts)
    { id: 14, name: 'Red Heart', price: 280, icon: '❤️', image: 'Подарки/загруженное (26).png', description: 'Collectible #2345', specs: { Model: 'Heart', Backdrop: 'Red 30%', Issued: '2,345/7,000' } },
    { id: 15, name: 'Pink Heart', price: 270, icon: '💖', image: 'Подарки/загруженное (14).png', description: 'Collectible #2567', specs: { Model: 'Heart', Backdrop: 'Pink 32%', Issued: '2,567/7,000' } },
    { id: 16, name: 'Blue Heart', price: 275, icon: '💙', image: 'Подарки/загруженное (6).png', description: 'Collectible #2456', specs: { Model: 'Heart', Backdrop: 'Blue 31%', Issued: '2,456/7,000' } },
    { id: 17, name: 'Purple Heart', price: 285, icon: '💜', image: 'Подарки/загруженное (30).png', description: 'Collectible #2678', specs: { Model: 'Heart', Backdrop: 'Purple 29%', Issued: '2,678/7,000' } },
    { id: 18, name: 'Green Heart', price: 265, icon: '💚', image: 'Подарки/загруженное (19).png', description: 'Collectible #2789', specs: { Model: 'Heart', Backdrop: 'Green 33%', Issued: '2,789/7,000' } },
    
    // Подарочные коробки (Gift Boxes)
    { id: 19, name: 'Red Gift Box', price: 310, icon: '🎁', image: 'Подарки/загруженное (8).png', description: 'Collectible #2123', specs: { Model: 'Gift Box', Backdrop: 'Red 28%', Issued: '2,123/6,500' } },
    { id: 20, name: 'Blue Gift Box', price: 300, icon: '🎁', image: 'Подарки/загруженное (23).png', description: 'Collectible #2234', specs: { Model: 'Gift Box', Backdrop: 'Blue 29%', Issued: '2,234/6,500' } },
    { id: 21, name: 'Green Gift Box', price: 305, icon: '🎁', image: 'Подарки/загруженное (1).png', description: 'Collectible #2345', specs: { Model: 'Gift Box', Backdrop: 'Green 28%', Issued: '2,345/6,500' } },
    { id: 22, name: 'Purple Gift Box', price: 315, icon: '🎁', image: 'Подарки/загруженное (17).png', description: 'Collectible #2456', specs: { Model: 'Gift Box', Backdrop: 'Purple 27%', Issued: '2,456/6,500' } },
    
    // Цветы (Flowers)
    { id: 23, name: 'Red Rose', price: 350, icon: '🌹', image: 'Подарки/загруженное (29).png', description: 'Collectible #1890', specs: { Model: 'Rose', Backdrop: 'Garden 25%', Issued: '1,890/6,000' } },
    { id: 24, name: 'Pink Rose', price: 340, icon: '🌹', image: 'Подарки/загруженное (10).png', description: 'Collectible #1945', specs: { Model: 'Rose', Backdrop: 'Pink 26%', Issued: '1,945/6,000' } },
    { id: 25, name: 'White Rose', price: 360, icon: '🌹', image: 'Подарки/загруженное (5).png', description: 'Collectible #1823', specs: { Model: 'Rose', Backdrop: 'Snow 24%', Issued: '1,823/6,000' } },
    { id: 26, name: 'Sunflower', price: 380, icon: '🌻', image: 'Подарки/загруженное (21).png', description: 'Collectible #1678', specs: { Model: 'Sunflower', Backdrop: 'Field 22%', Issued: '1,678/5,500' } },
    { id: 27, name: 'Cherry Blossom', price: 390, icon: '🌸', image: 'Подарки/загруженное (16).png', description: 'Collectible #1567', specs: { Model: 'Cherry Blossom', Backdrop: 'Spring 21%', Issued: '1,567/5,500' } },
    { id: 28, name: 'Tulip', price: 370, icon: '🌷', image: 'Подарки/загруженное.png', description: 'Collectible #1734', specs: { Model: 'Tulip', Backdrop: 'Garden 23%', Issued: '1,734/5,500' } },
    
    // Сладости (Sweets)
    { id: 29, name: 'Candy', price: 420, icon: '🍬', image: 'Подарки/загруженное (13).png', description: 'Collectible #1456', specs: { Model: 'Candy', Backdrop: 'Sweet 20%', Issued: '1,456/5,000' } },
    { id: 30, name: 'Lollipop', price: 430, icon: '🍭', image: 'Подарки/загруженное (27).png', description: 'Collectible #1389', specs: { Model: 'Lollipop', Backdrop: 'Rainbow 19%', Issued: '1,389/5,000' } },
    { id: 31, name: 'Cookie', price: 410, icon: '🍪', image: 'Подарки/загруженное (2).png', description: 'Collectible #1523', specs: { Model: 'Cookie', Backdrop: 'Chocolate 21%', Issued: '1,523/5,000' } },
    { id: 32, name: 'Cupcake', price: 450, icon: '🧁', image: 'Подарки/загруженное (24).png', description: 'Collectible #1345', specs: { Model: 'Cupcake', Backdrop: 'Pink 18%', Issued: '1,345/5,000' } },
    { id: 33, name: 'Donut', price: 440, icon: '🍩', image: 'Подарки/загруженное (32).png', description: 'Collectible #1412', specs: { Model: 'Donut', Backdrop: 'Glazed 19%', Issued: '1,412/5,000' } },
    
    // Фрукты (Fruits)
    { id: 34, name: 'Strawberry', price: 480, icon: '🍓', image: 'Подарки/загруженное (11).png', description: 'Collectible #1234', specs: { Model: 'Strawberry', Backdrop: 'Fresh 17%', Issued: '1,234/4,500' } },
    { id: 35, name: 'Watermelon', price: 490, icon: '🍉', image: 'Подарки/загруженное (6).png', description: 'Collectible #1178', specs: { Model: 'Watermelon', Backdrop: 'Summer 16%', Issued: '1,178/4,500' } },
    { id: 36, name: 'Peach', price: 470, icon: '🍑', image: 'Подарки/загруженное (20).png', description: 'Collectible #1289', specs: { Model: 'Peach', Backdrop: 'Sweet 17%', Issued: '1,289/4,500' } },
    { id: 37, name: 'Pineapple', price: 500, icon: '🍍', image: 'Подарки/загруженное (15).png', description: 'Collectible #1156', specs: { Model: 'Pineapple', Backdrop: 'Tropical 16%', Issued: '1,156/4,500' } },
    
    // Праздничные (Party)
    { id: 38, name: 'Party Popper', price: 550, icon: '🎉', image: 'Подарки/загруженное (3).png', description: 'Collectible #1023', specs: { Model: 'Party Popper', Backdrop: 'Confetti 15%', Issued: '1,023/4,000' } },
    { id: 39, name: 'Confetti Ball', price: 540, icon: '🎊', image: 'Подарки/загруженное (22).png', description: 'Collectible #1067', specs: { Model: 'Confetti Ball', Backdrop: 'Party 15%', Issued: '1,067/4,000' } },
    { id: 40, name: 'Sparkles', price: 560, icon: '✨', image: 'Подарки/загруженное (9).png', description: 'Collectible #989', specs: { Model: 'Sparkles', Backdrop: 'Magic 14%', Issued: '989/4,000' } },
    
    // Еда (Food)
    { id: 41, name: 'Pizza Slice', price: 620, icon: '🍕', image: 'Подарки/загруженное (31).png', description: 'Collectible #876', specs: { Model: 'Pizza', Backdrop: 'Italian 13%', Issued: '876/3,500' } },
    { id: 42, name: 'Hot Dog', price: 590, icon: '🌭', image: 'Подарки/загруженное (14).png', description: 'Collectible #923', specs: { Model: 'Hot Dog', Backdrop: 'Classic 14%', Issued: '923/3,500' } },
    { id: 43, name: 'Burger', price: 630, icon: '🍔', image: 'Подарки/загруженное (27).png', description: 'Collectible #845', specs: { Model: 'Burger', Backdrop: 'Fast Food 13%', Issued: '845/3,500' } },
    { id: 44, name: 'French Fries', price: 600, icon: '🍟', image: 'Подарки/загруженное (8).png', description: 'Collectible #901', specs: { Model: 'Fries', Backdrop: 'Golden 13%', Issued: '901/3,500' } },
    
    // Напитки (Drinks)
    { id: 45, name: 'Coffee', price: 680, icon: '☕', image: 'Подарки/загруженное (19).png', description: 'Collectible #789', specs: { Model: 'Coffee', Backdrop: 'Morning 12%', Issued: '789/3,000' } },
    { id: 46, name: 'Tea Cup', price: 670, icon: '🍵', image: 'Подарки/загруженное (4).png', description: 'Collectible #812', specs: { Model: 'Tea', Backdrop: 'Zen 12%', Issued: '812/3,000' } },
    { id: 47, name: 'Cocktail', price: 720, icon: '🍹', image: 'Подарки/загруженное (26).png', description: 'Collectible #756', specs: { Model: 'Cocktail', Backdrop: 'Tropical 11%', Issued: '756/3,000' } },
    
    // Прочие дешевые
    { id: 48, name: 'Avocado', price: 750, icon: '🥑', image: 'Подарки/загруженное (12).png', description: 'Collectible #723', specs: { Model: 'Avocado', Backdrop: 'Healthy 11%', Issued: '723/2,800' } },
    { id: 49, name: 'Ice Cream', price: 780, icon: '🍦', image: 'Подарки/загруженное (30).png', description: 'Collectible #698', specs: { Model: 'Ice Cream', Backdrop: 'Sweet 10%', Issued: '698/2,800' } },
    { id: 50, name: 'Delicious Cake', price: 850, icon: '🎂', image: 'Подарки/загруженное (1).png', description: 'Collectible #645', specs: { Model: 'Cake', Backdrop: 'Party 10%', Issued: '645/2,500' } },
    
    // ========== СРЕДНИЕ ПОДАРКИ (15 штук) 1000-10000₽ ==========
    
    { id: 51, name: 'Heart Locket', price: 12734, icon: '💝', image: 'Подарки/загруженное (17).png', description: 'Collectible #875', specs: { Model: 'Heart Locket 8%', Backdrop: 'Gold Pattern', Issued: '875/1,500' } },
    { id: 52, name: 'Loot Bag', price: 11111, icon: '💰', image: 'Подарки/загруженное (5).png', description: 'Collectible #11217', specs: { Model: 'Loot Bag 5%', Backdrop: 'Gold', Issued: '11,217/15,000' } },
    { id: 53, name: 'Ghost', price: 4200, icon: '👻', image: 'Подарки/загруженное (23).png', description: 'Collectible #523', specs: { Model: 'Ghost 12%', Backdrop: 'Spooky', Issued: '523/2,000' } },
    { id: 54, name: 'Fire', price: 5800, icon: '🔥', image: 'Подарки/загруженное (10).png', description: 'Collectible #412', specs: { Model: 'Fire 10%', Backdrop: 'Flames', Issued: '412/1,800' } },
    { id: 55, name: 'Lightning', price: 4500, icon: '⚡', image: 'Подарки/загруженное (28).png', description: 'Collectible #489', specs: { Model: 'Lightning 11%', Backdrop: 'Storm', Issued: '489/1,800' } },
    { id: 56, name: 'Rainbow', price: 6200, icon: '🌈', image: 'Подарки/загруженное (16).png', description: 'Collectible #356', specs: { Model: 'Rainbow 9%', Backdrop: 'Sky', Issued: '356/1,500' } },
    { id: 57, name: 'Disco Ball', price: 7100, icon: '🪩', image: 'Подарки/загруженное (7).png', description: 'Collectible #298', specs: { Model: 'Disco Ball 8%', Backdrop: 'Party', Issued: '298/1,200' } },
    { id: 58, name: 'Fireworks', price: 5500, icon: '🎆', image: 'Подарки/загруженное (21).png', description: 'Collectible #423', specs: { Model: 'Fireworks 10%', Backdrop: 'Night', Issued: '423/1,500' } },
    { id: 59, name: 'Trophy', price: 6800, icon: '🏆', image: 'Подарки/загруженное (13).png', description: 'Collectible #334', specs: { Model: 'Trophy 9%', Backdrop: 'Gold', Issued: '334/1,300' } },
    { id: 60, name: 'Crown', price: 8500, icon: '👑', image: 'Подарки/загруженное (29).png', description: 'Collectible #267', specs: { Model: 'Crown 7%', Backdrop: 'Royal', Issued: '267/1,100' } },
    { id: 61, name: 'Rocket', price: 7800, icon: '🚀', image: 'Подарки/загруженное (2).png', description: 'Collectible #289', specs: { Model: 'Rocket 8%', Backdrop: 'Space', Issued: '289/1,200' } },
    { id: 62, name: 'Christmas Tree', price: 6500, icon: '🎄', image: 'Подарки/загруженное (24).png', description: 'Collectible #378', specs: { Model: 'Christmas Tree 9%', Backdrop: 'Snow', Issued: '378/1,400' } },
    { id: 63, name: 'Snowflake', price: 5900, icon: '❄️', image: 'Подарки/загруженное (18).png', description: 'Collectible #412', specs: { Model: 'Snowflake 10%', Backdrop: 'Ice', Issued: '412/1,500' } },
    { id: 64, name: 'Pumpkin', price: 5200, icon: '🎃', image: 'Подарки/загруженное (32).png', description: 'Collectible #456', specs: { Model: 'Pumpkin 10%', Backdrop: 'Halloween', Issued: '456/1,600' } },
    { id: 65, name: 'Four Leaf Clover', price: 9200, icon: '🍀', image: 'Подарки/загруженное.png', description: 'Collectible #189', specs: { Model: 'Clover 6%', Backdrop: 'Luck', Issued: '189/900' } },
    
    // ========== ДОРОГИЕ ПОДАРКИ (5 штук) 10000₽+ ==========
    
    { id: 66, name: 'Plush Pepe', price: 48000, icon: '🐸', image: 'Подарки/загруженное (25).png', description: 'Collectible #1515', specs: { Model: 'Pepe La Rana 2%', Backdrop: 'Purple 1.5%', Symbol: 'Rainbow' } },
    { id: 67, name: 'Plush Pepe', price: 30000, icon: '🐸', image: 'Подарки/загруженное (9).png', description: 'Collectible #2658', specs: { Model: 'Pepe La Rana 2%', Backdrop: 'Black 2%', Symbol: 'Shine' } },
    { id: 68, name: 'Plush Pepe', price: 15000, icon: '🐸', image: 'Подарки/загруженное (14).png', description: 'Collectible #858', specs: { Model: 'Pepe La Rana 2%', Backdrop: 'Purple 1.5%', Symbol: 'Pink' } },
    { id: 69, name: 'Plush Pepe', price: 12345, icon: '🐸', image: 'Подарки/загруженное (22).png', description: 'Collectible #1609', specs: { Model: 'Pepe La Rana 2%', Backdrop: 'Orange 2%', Symbol: 'Sold' } },
    { id: 70, name: 'Plush Pepe', price: 11888, icon: '🐸', image: 'Подарки/загруженное (31).png', description: 'Collectible #289', specs: { Model: 'Pepe La Rana 2%', Backdrop: 'Red 2.2%', Symbol: 'Star' } },
];

