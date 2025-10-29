// Реальные Telegram NFT Подарки из Fragment/Portals (33 товара)
// Обновлено на основе файлов из папки Подарки

const products = [
    // ========== ДЕШЕВЫЕ ПОДАРКИ (до 1000₽) - 2 шт ==========
    
    { id: 1, name: 'Ginger Cookie', price: 700, icon: '🍪', image: 'Подарки/GingerCookie-700.png', description: 'Collectible #1001', specs: { Model: 'Ginger Cookie 3%', Backdrop: 'Brown 3%', Symbol: 'Sweet 3%' } },
    { id: 2, name: 'Santa Hat', price: 900, icon: '🎅', image: 'Подарки/SantaHat-900.png', description: 'Collectible #1002', specs: { Model: 'Santa Hat 3%', Backdrop: 'Red 3%', Symbol: 'Festive 3%' } },
    
    // ========== СРЕДНИЕ ПОДАРКИ (1000-10000₽) - 25 шт ==========
    
    { id: 3, name: 'Santa Hat', price: 1000, icon: '🎅', image: 'Подарки/SantaHat-1000.png', description: 'Collectible #2001', specs: { Model: 'Santa Hat 3%', Backdrop: 'Red 3%', Symbol: 'Snow 3%' } },
    { id: 4, name: 'Input Key', price: 1300, icon: '🔑', image: 'Подарки/InputKey-1300.png', description: 'Collectible #2002', specs: { Model: 'Input Key 3%', Backdrop: 'Golden 3%', Symbol: 'Tech 3%' } },
    { id: 5, name: 'Bow Tie', price: 1340, icon: '🎀', image: 'Подарки/BowTie-1340.png', description: 'Collectible #2003', specs: { Model: 'Bow Tie 3%', Backdrop: 'Elegant 3%', Symbol: 'Silk 3%' } },
    { id: 6, name: 'Input Key', price: 1600, icon: '🔑', image: 'Подарки/InputKey-1600.png', description: 'Collectible #2004', specs: { Model: 'Input Key 3%', Backdrop: 'Silver 3%', Symbol: 'Digital 3%' } },
    { id: 7, name: 'Hex Pot', price: 1700, icon: '🔮', image: 'Подарки/HexPot-1700.png', description: 'Collectible #2005', specs: { Model: 'Hex Pot 3%', Backdrop: 'Mystic 3%', Symbol: 'Magic 2.5%' } },
    { id: 8, name: 'Santa Hat', price: 2100, icon: '🎅', image: 'Подарки/SantaHat-2100.png', description: 'Collectible #2006', specs: { Model: 'Santa Hat 3%', Backdrop: 'Red 3%', Symbol: 'Gift 2%' } },
    { id: 9, name: 'Hex Pot', price: 2100, icon: '🔮', image: 'Подарки/HexPot-2100.png', description: 'Collectible #2007', specs: { Model: 'Hex Pot 3%', Backdrop: 'Purple 3%', Symbol: 'Spell 2%' } },
    { id: 10, name: 'Xmas Stocking', price: 2300, icon: '🎄', image: 'Подарки/XmasStocking-2300.png', description: 'Collectible #2008', specs: { Model: 'Xmas Stocking 3%', Backdrop: 'Festive 3%', Symbol: 'Joy 2%' } },
    { id: 11, name: 'Bow Tie', price: 2350, icon: '🎀', image: 'Подарки/BowTie-2350.png', description: 'Collectible #2009', specs: { Model: 'Bow Tie 3%', Backdrop: 'Luxury 3%', Symbol: 'Style 2%' } },
    { id: 12, name: 'Input Key', price: 2500, icon: '🔑', image: 'Подарки/InputKey-2500.png', description: 'Collectible #2010', specs: { Model: 'Input Key 3%', Backdrop: 'Bronze 3%', Symbol: 'Code 2%' } },
    { id: 13, name: 'Santa Hat', price: 3000, icon: '🎅', image: 'Подарки/SantaHat-3000.png', description: 'Collectible #2011', specs: { Model: 'Santa Hat 3%', Backdrop: 'White 3%', Symbol: 'Star 1.5%' } },
    { id: 14, name: 'Input Key', price: 3200, icon: '🔑', image: 'Подарки/InputKey-3200.png', description: 'Collectible #2012', specs: { Model: 'Input Key 3%', Backdrop: 'Platinum 3%', Symbol: 'Access 1.5%' } },
    { id: 15, name: 'Xmas Stocking', price: 3200, icon: '🎄', image: 'Подарки/XmasStocking-3200.png', description: 'Collectible #2013', specs: { Model: 'Xmas Stocking 3%', Backdrop: 'Green 3%', Symbol: 'Present 1.5%' } },
    { id: 16, name: 'Tama Gadget', price: 3300, icon: '🎮', image: 'Подарки/TamaGadget-3300.png', description: 'Collectible #2014', specs: { Model: 'Tama Gadget 3%', Backdrop: 'Retro 3%', Symbol: 'Pixel 1.5%' } },
    { id: 17, name: 'Ginger Cookie', price: 3450, icon: '🍪', image: 'Подарки/GingerCookie-3450.png', description: 'Collectible #2015', specs: { Model: 'Ginger Cookie 3%', Backdrop: 'Spice 3%', Symbol: 'Candy 1.5%' } },
    { id: 18, name: 'Pet Snake', price: 4000, icon: '🐍', image: 'Подарки/PetSnake-4000.png', description: 'Collectible #2016', specs: { Model: 'Pet Snake 3%', Backdrop: 'Exotic 3%', Symbol: 'Scale 1.5%' } },
    { id: 19, name: 'Ginger Cookie', price: 4300, icon: '🍪', image: 'Подарки/GingerCookie-4300.png', description: 'Collectible #2017', specs: { Model: 'Ginger Cookie 3%', Backdrop: 'Delicious 3%', Symbol: 'Icing 1.5%' } },
    { id: 20, name: 'Top Hat', price: 4300, icon: '🎩', image: 'Подарки/TopHat-4300.png', description: 'Collectible #2018', specs: { Model: 'Top Hat 3%', Backdrop: 'Classic 3%', Symbol: 'Gentleman 1.5%' } },
    { id: 21, name: 'Xmas Stocking', price: 4600, icon: '🎄', image: 'Подарки/XmasStocking-4600.png', description: 'Collectible #2019', specs: { Model: 'Xmas Stocking 3%', Backdrop: 'Red 3%', Symbol: 'Ornament 1.5%' } },
    { id: 22, name: 'Winter Wreath', price: 5600, icon: '🎀', image: 'Подарки/WinterWreath-5600.png', description: 'Collectible #2020', specs: { Model: 'Winter Wreath 3%', Backdrop: 'Frost 3%', Symbol: 'Holly 1.5%' } },
    { id: 23, name: 'Input Key', price: 6000, icon: '🔑', image: 'Подарки/InputKey-6000.png', description: 'Collectible #2021', specs: { Model: 'Input Key 3%', Backdrop: 'Diamond 3%', Symbol: 'Unlock 1.5%' } },
    { id: 24, name: 'Ginger Cookie', price: 7200, icon: '🍪', image: 'Подарки/GingerCookie-7200.png', description: 'Collectible #2022', specs: { Model: 'Ginger Cookie 3%', Backdrop: 'Premium 3%', Symbol: 'Glaze 1.5%' } },
    { id: 25, name: 'Ginger Cookie', price: 7250, icon: '🍪', image: 'Подарки/GingerCookie-7250.png', description: 'Collectible #2023', specs: { Model: 'Ginger Cookie 3%', Backdrop: 'Special 3%', Symbol: 'Decor 1.5%' } },
    { id: 26, name: 'Voodoo Doll', price: 7460, icon: '🪆', image: 'Подарки/VoodooDoll-7460.png', description: 'Collectible #2024', specs: { Model: 'Voodoo Doll 3%', Backdrop: 'Dark 3%', Symbol: 'Mystery 1.5%' } },
    { id: 27, name: 'Bow Tie', price: 8000, icon: '🎀', image: 'Подарки/BowTie-8000.png', description: 'Collectible #2025', specs: { Model: 'Bow Tie 2%', Backdrop: 'Royal 3%', Symbol: 'Noble 1.5%' } },
    
    // ========== ДОРОГИЕ ПОДАРКИ (10000₽+) - 6 шт ==========
    
    { id: 28, name: 'Eternal Rose', price: 11000, icon: '🌹', image: 'Подарки/EternalRose-11000.png', description: 'Collectible #3001', specs: { Model: 'Eternal Rose 1.5%', Backdrop: 'Romantic 3%', Symbol: 'Love 1.5%' } },
    { id: 29, name: 'Voodoo Doll', price: 12000, icon: '🪆', image: 'Подарки/VoodooDoll-12000.png', description: 'Collectible #3002', specs: { Model: 'Voodoo Doll 1.5%', Backdrop: 'Cursed 2.5%', Symbol: 'Hex 1.5%' } },
    { id: 30, name: 'Vintage Cigar', price: 12300, icon: '🚬', image: 'Подарки/VintageCigar-12300.png', description: 'Collectible #3003', specs: { Model: 'Vintage Cigar 1.5%', Backdrop: 'Luxury 2%', Symbol: 'Smoke 1.5%' } },
    { id: 31, name: 'Top Hat', price: 14500, icon: '🎩', image: 'Подарки/TopHat-14500.png', description: 'Collectible #3004', specs: { Model: 'Top Hat 1.5%', Backdrop: 'Elite 1.8%', Symbol: 'Prestige 1.5%' } },
    { id: 32, name: 'Vintage Cigar', price: 21000, icon: '🚬', image: 'Подарки/VintageCigar-21000.png', description: 'Collectible #3005', specs: { Model: 'Vintage Cigar 1.5%', Backdrop: 'Rare 1.5%', Symbol: 'Aged 1.5%' } },
    { id: 33, name: 'Astral Shard', price: 31000, icon: '💎', image: 'Подарки/AstralShard-31000.png', description: 'Collectible #3006', specs: { Model: 'Astral Shard 1.5%', Backdrop: 'Cosmic 1.5%', Symbol: 'Crystal 1.5%' } },
    
    // ========== НОВЫЕ ПОДАРКИ - 37 шт ==========
    
    // Desk Calendar (200-300₽) - 12 шт
    { id: 34, name: 'Desk Calendar', price: 210, icon: '📅', image: 'Подарки/DeskCalendar1.png', description: 'Collectible #4001', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Office 3%', Symbol: 'Time 3%' } },
    { id: 35, name: 'Desk Calendar', price: 225, icon: '📅', image: 'Подарки/DeskCalendar2.png', description: 'Collectible #4002', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Work 3%', Symbol: 'Date 3%' } },
    { id: 36, name: 'Desk Calendar', price: 235, icon: '📅', image: 'Подарки/DeskCalendar3.png', description: 'Collectible #4003', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Business 3%', Symbol: 'Plan 3%' } },
    { id: 37, name: 'Desk Calendar', price: 245, icon: '📅', image: 'Подарки/DeskCalendar4.png', description: 'Collectible #4004', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Paper 3%', Symbol: 'Month 3%' } },
    { id: 38, name: 'Desk Calendar', price: 255, icon: '📅', image: 'Подарки/DeskCalendar5.png', description: 'Collectible #4005', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Desktop 3%', Symbol: 'Year 3%' } },
    { id: 39, name: 'Desk Calendar', price: 260, icon: '📅', image: 'Подарки/DeskCalendar6.png', description: 'Collectible #4006', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Schedule 3%', Symbol: 'Week 3%' } },
    { id: 40, name: 'Desk Calendar', price: 268, icon: '📅', image: 'Подарки/DeskCalendar7.png', description: 'Collectible #4007', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Memo 3%', Symbol: 'Day 3%' } },
    { id: 41, name: 'Desk Calendar', price: 275, icon: '📅', image: 'Подарки/DeskCalendar8.png', description: 'Collectible #4008', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Planner 3%', Symbol: 'Event 3%' } },
    { id: 42, name: 'Desk Calendar', price: 282, icon: '📅', image: 'Подарки/DeskCalendar9.png', description: 'Collectible #4009', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Organize 3%', Symbol: 'Task 3%' } },
    { id: 43, name: 'Desk Calendar', price: 288, icon: '📅', image: 'Подарки/DeskCalendar10.png', description: 'Collectible #4010', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Grid 3%', Symbol: 'Note 3%' } },
    { id: 44, name: 'Desk Calendar', price: 293, icon: '📅', image: 'Подарки/DeskCalendar11.png', description: 'Collectible #4011', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Table 3%', Symbol: 'Mark 3%' } },
    { id: 45, name: 'Desk Calendar', price: 298, icon: '📅', image: 'Подарки/DeskCalendar12.png', description: 'Collectible #4012', specs: { Model: 'Desk Calendar 3%', Backdrop: 'Desk 3%', Symbol: 'Pin 2.5%' } },
    
    // Hypno Lollipop (500-700₽) - 5 шт
    { id: 46, name: 'Hypno Lollipop', price: 520, icon: '🍭', image: 'Подарки/HypnoLollipop1.png', description: 'Collectible #4013', specs: { Model: 'Hypno Lollipop 3%', Backdrop: 'Spiral 3%', Symbol: 'Sweet 3%' } },
    { id: 47, name: 'Hypno Lollipop', price: 570, icon: '🍭', image: 'Подарки/HypnoLollipop2.png', description: 'Collectible #4014', specs: { Model: 'Hypno Lollipop 3%', Backdrop: 'Candy 3%', Symbol: 'Twist 3%' } },
    { id: 48, name: 'Hypno Lollipop', price: 620, icon: '🍭', image: 'Подарки/HypnoLollipop3.png', description: 'Collectible #4015', specs: { Model: 'Hypno Lollipop 3%', Backdrop: 'Swirl 3%', Symbol: 'Sugar 3%' } },
    { id: 49, name: 'Hypno Lollipop', price: 660, icon: '🍭', image: 'Подарки/HypnoLollipop4.png', description: 'Collectible #4016', specs: { Model: 'Hypno Lollipop 3%', Backdrop: 'Hypnotic 3%', Symbol: 'Trance 3%' } },
    { id: 50, name: 'Hypno Lollipop', price: 695, icon: '🍭', image: 'Подарки/HypnoLollipop5.png', description: 'Collectible #4017', specs: { Model: 'Hypno Lollipop 3%', Backdrop: 'Mesmer 3%', Symbol: 'Magic 3%' } },
    
    // Big Year (900-1200₽) - 10 шт
    { id: 51, name: 'Big Year', price: 920, icon: '🎆', image: 'Подарки/BigYear1.png', description: 'Collectible #4018', specs: { Model: 'Big Year 3%', Backdrop: 'Celebration 3%', Symbol: 'Firework 2.5%' } },
    { id: 52, name: 'Big Year', price: 960, icon: '🎆', image: 'Подарки/BigYear2.png', description: 'Collectible #4019', specs: { Model: 'Big Year 3%', Backdrop: 'Party 3%', Symbol: 'Sparkle 2.2%' } },
    { id: 53, name: 'Big Year', price: 1000, icon: '🎆', image: 'Подарки/BigYear3.png', description: 'Collectible #4020', specs: { Model: 'Big Year 3%', Backdrop: 'Festival 3%', Symbol: 'Blast 2%' } },
    { id: 54, name: 'Big Year', price: 1040, icon: '🎆', image: 'Подарки/BigYear4.png', description: 'Collectible #4021', specs: { Model: 'Big Year 3%', Backdrop: 'Holiday 3%', Symbol: 'Boom 1.8%' } },
    { id: 55, name: 'Big Year', price: 1075, icon: '🎆', image: 'Подарки/BigYear5.png', description: 'Collectible #4022', specs: { Model: 'Big Year 3%', Backdrop: 'Joy 3%', Symbol: 'Light 1.6%' } },
    { id: 56, name: 'Big Year', price: 1105, icon: '🎆', image: 'Подарки/BigYear6.png', description: 'Collectible #4023', specs: { Model: 'Big Year 3%', Backdrop: 'Cheer 3%', Symbol: 'Flash 1.5%' } },
    { id: 57, name: 'Big Year', price: 1135, icon: '🎆', image: 'Подарки/BigYear7.png', description: 'Collectible #4024', specs: { Model: 'Big Year 3%', Backdrop: 'Festive 3%', Symbol: 'Glow 1.5%' } },
    { id: 58, name: 'Big Year', price: 1160, icon: '🎆', image: 'Подарки/BigYear8.png', description: 'Collectible #4025', specs: { Model: 'Big Year 3%', Backdrop: 'Happy 3%', Symbol: 'Star 1.5%' } },
    { id: 59, name: 'Big Year', price: 1180, icon: '🎆', image: 'Подарки/BigYear9.png', description: 'Collectible #4026', specs: { Model: 'Big Year 2%', Backdrop: 'Bright 3%', Symbol: 'Shine 1.5%' } },
    { id: 60, name: 'Big Year', price: 1195, icon: '🎆', image: 'Подарки/BigYear10.png', description: 'Collectible #4027', specs: { Model: 'Big Year 1.5%', Backdrop: 'Epic 3%', Symbol: 'Grand 1.5%' } },
    
    // Cookie Heart (1200-1400₽) - 5 шт
    { id: 61, name: 'Cookie Heart', price: 1220, icon: '💝', image: 'Подарки/CookieHeart1.png', description: 'Collectible #4028', specs: { Model: 'Cookie Heart 3%', Backdrop: 'Love 3%', Symbol: 'Baked 2%' } },
    { id: 62, name: 'Cookie Heart', price: 1270, icon: '💝', image: 'Подарки/CookieHeart2.png', description: 'Collectible #4029', specs: { Model: 'Cookie Heart 3%', Backdrop: 'Sweet 3%', Symbol: 'Heart 1.8%' } },
    { id: 63, name: 'Cookie Heart', price: 1320, icon: '💝', image: 'Подарки/CookieHeart3.png', description: 'Collectible #4030', specs: { Model: 'Cookie Heart 3%', Backdrop: 'Valentine 3%', Symbol: 'Sugar 1.6%' } },
    { id: 64, name: 'Cookie Heart', price: 1360, icon: '💝', image: 'Подарки/CookieHeart5.png', description: 'Collectible #4031', specs: { Model: 'Cookie Heart 3%', Backdrop: 'Romance 3%', Symbol: 'Frosting 1.5%' } },
    { id: 65, name: 'Cookie Heart', price: 1390, icon: '💝', image: 'Подарки/CookieHeart6.png', description: 'Collectible #4032', specs: { Model: 'Cookie Heart 3%', Backdrop: 'Cute 3%', Symbol: 'Chocolate 1.5%' } },
    
    // Snoop Dogg (1400-1600₽) - 5 шт
    { id: 66, name: 'Snoop Dogg', price: 1420, icon: '🎤', image: 'Подарки/SnoopDogg1.png', description: 'Collectible #4033', specs: { Model: 'Snoop Dogg 3%', Backdrop: 'Hip-Hop 3%', Symbol: 'Legend 2%' } },
    { id: 67, name: 'Snoop Dogg', price: 1470, icon: '🎤', image: 'Подарки/SnoopDogg2.png', description: 'Collectible #4034', specs: { Model: 'Snoop Dogg 3%', Backdrop: 'Rap 3%', Symbol: 'Music 1.8%' } },
    { id: 68, name: 'Snoop Dogg', price: 1520, icon: '🎤', image: 'Подарки/SnoopDogg3.png', description: 'Collectible #4035', specs: { Model: 'Snoop Dogg 3%', Backdrop: 'Street 3%', Symbol: 'Mic 1.6%' } },
    { id: 69, name: 'Snoop Dogg', price: 1560, icon: '🎤', image: 'Подарки/SnoopDogg4.png', description: 'Collectible #4036', specs: { Model: 'Snoop Dogg 3%', Backdrop: 'West Coast 3%', Symbol: 'Beat 1.5%' } },
    { id: 70, name: 'Snoop Dogg', price: 1590, icon: '🎤', image: 'Подарки/SnoopDogg5.png', description: 'Collectible #4037', specs: { Model: 'Snoop Dogg 3%', Backdrop: 'Gangsta 3%', Symbol: 'Rhyme 1.5%' } },
];
