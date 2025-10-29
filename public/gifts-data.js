// Реальные Telegram NFT Подарки из Fragment/Portals (33 товара)
// Обновлено на основе файлов из папки Подарки

const products = [
    // ========== ДЕШЕВЫЕ ПОДАРКИ (до 1000₽) - 2 шт ==========
    
    { id: 1, name: 'Ginger Cookie', price: 700, icon: '🍪', image: 'Подарки/GingerCookie-700.png', description: 'Collectible #1001', specs: { Model: 'Ginger Cookie 12%', Backdrop: 'Brown 18%', Symbol: 'Sweet 5%' } },
    { id: 2, name: 'Santa Hat', price: 900, icon: '🎅', image: 'Подарки/SantaHat-900.png', description: 'Collectible #1002', specs: { Model: 'Santa Hat 11%', Backdrop: 'Red 16%', Symbol: 'Festive 4%' } },
    
    // ========== СРЕДНИЕ ПОДАРКИ (1000-10000₽) - 25 шт ==========
    
    { id: 3, name: 'Santa Hat', price: 1000, icon: '🎅', image: 'Подарки/SantaHat-1000.png', description: 'Collectible #2001', specs: { Model: 'Santa Hat 10%', Backdrop: 'Red 15%', Symbol: 'Snow 3%' } },
    { id: 4, name: 'Input Key', price: 1300, icon: '🔑', image: 'Подарки/InputKey-1300.png', description: 'Collectible #2002', specs: { Model: 'Input Key 9%', Backdrop: 'Golden 14%', Symbol: 'Tech 3%' } },
    { id: 5, name: 'Bow Tie', price: 1340, icon: '🎀', image: 'Подарки/BowTie-1340.png', description: 'Collectible #2003', specs: { Model: 'Bow Tie 9%', Backdrop: 'Elegant 14%', Symbol: 'Silk 3%' } },
    { id: 6, name: 'Input Key', price: 1600, icon: '🔑', image: 'Подарки/InputKey-1600.png', description: 'Collectible #2004', specs: { Model: 'Input Key 9%', Backdrop: 'Silver 13%', Symbol: 'Digital 3%' } },
    { id: 7, name: 'Hex Pot', price: 1700, icon: '🔮', image: 'Подарки/HexPot-1700.png', description: 'Collectible #2005', specs: { Model: 'Hex Pot 8%', Backdrop: 'Mystic 13%', Symbol: 'Magic 2.5%' } },
    { id: 8, name: 'Santa Hat', price: 2100, icon: '🎅', image: 'Подарки/SantaHat-2100.png', description: 'Collectible #2006', specs: { Model: 'Santa Hat 8%', Backdrop: 'Red 12%', Symbol: 'Gift 2%' } },
    { id: 9, name: 'Hex Pot', price: 2100, icon: '🔮', image: 'Подарки/HexPot-2100.png', description: 'Collectible #2007', specs: { Model: 'Hex Pot 8%', Backdrop: 'Purple 12%', Symbol: 'Spell 2%' } },
    { id: 10, name: 'Xmas Stocking', price: 2300, icon: '🎄', image: 'Подарки/XmasStocking-2300.png', description: 'Collectible #2008', specs: { Model: 'Xmas Stocking 7%', Backdrop: 'Festive 11%', Symbol: 'Joy 2%' } },
    { id: 11, name: 'Bow Tie', price: 2350, icon: '🎀', image: 'Подарки/BowTie-2350.png', description: 'Collectible #2009', specs: { Model: 'Bow Tie 7%', Backdrop: 'Luxury 11%', Symbol: 'Style 2%' } },
    { id: 12, name: 'Input Key', price: 2500, icon: '🔑', image: 'Подарки/InputKey-2500.png', description: 'Collectible #2010', specs: { Model: 'Input Key 7%', Backdrop: 'Bronze 11%', Symbol: 'Code 2%' } },
    { id: 13, name: 'Santa Hat', price: 3000, icon: '🎅', image: 'Подарки/SantaHat-3000.png', description: 'Collectible #2011', specs: { Model: 'Santa Hat 6%', Backdrop: 'White 10%', Symbol: 'Star 1.5%' } },
    { id: 14, name: 'Input Key', price: 3200, icon: '🔑', image: 'Подарки/InputKey-3200.png', description: 'Collectible #2012', specs: { Model: 'Input Key 6%', Backdrop: 'Platinum 10%', Symbol: 'Access 1.5%' } },
    { id: 15, name: 'Xmas Stocking', price: 3200, icon: '🎄', image: 'Подарки/XmasStocking-3200.png', description: 'Collectible #2013', specs: { Model: 'Xmas Stocking 6%', Backdrop: 'Green 10%', Symbol: 'Present 1.5%' } },
    { id: 16, name: 'Tama Gadget', price: 3300, icon: '🎮', image: 'Подарки/TamaGadget-3300.png', description: 'Collectible #2014', specs: { Model: 'Tama Gadget 6%', Backdrop: 'Retro 9%', Symbol: 'Pixel 1%' } },
    { id: 17, name: 'Ginger Cookie', price: 3450, icon: '🍪', image: 'Подарки/GingerCookie-3450.png', description: 'Collectible #2015', specs: { Model: 'Ginger Cookie 5%', Backdrop: 'Spice 9%', Symbol: 'Candy 1%' } },
    { id: 18, name: 'Pet Snake', price: 4000, icon: '🐍', image: 'Подарки/PetSnake-4000.png', description: 'Collectible #2016', specs: { Model: 'Pet Snake 5%', Backdrop: 'Exotic 8%', Symbol: 'Scale 1%' } },
    { id: 19, name: 'Ginger Cookie', price: 4300, icon: '🍪', image: 'Подарки/GingerCookie-4300.png', description: 'Collectible #2017', specs: { Model: 'Ginger Cookie 5%', Backdrop: 'Delicious 8%', Symbol: 'Icing 1%' } },
    { id: 20, name: 'Top Hat', price: 4300, icon: '🎩', image: 'Подарки/TopHat-4300.png', description: 'Collectible #2018', specs: { Model: 'Top Hat 5%', Backdrop: 'Classic 8%', Symbol: 'Gentleman 1%' } },
    { id: 21, name: 'Xmas Stocking', price: 4600, icon: '🎄', image: 'Подарки/XmasStocking-4600.png', description: 'Collectible #2019', specs: { Model: 'Xmas Stocking 4%', Backdrop: 'Red 7%', Symbol: 'Ornament 0.8%' } },
    { id: 22, name: 'Winter Wreath', price: 5600, icon: '🎀', image: 'Подарки/WinterWreath-5600.png', description: 'Collectible #2020', specs: { Model: 'Winter Wreath 4%', Backdrop: 'Frost 7%', Symbol: 'Holly 0.8%' } },
    { id: 23, name: 'Input Key', price: 6000, icon: '🔑', image: 'Подарки/InputKey-6000.png', description: 'Collectible #2021', specs: { Model: 'Input Key 3%', Backdrop: 'Diamond 6%', Symbol: 'Unlock 0.7%' } },
    { id: 24, name: 'Ginger Cookie', price: 7200, icon: '🍪', image: 'Подарки/GingerCookie-7200.png', description: 'Collectible #2022', specs: { Model: 'Ginger Cookie 3%', Backdrop: 'Premium 6%', Symbol: 'Glaze 0.7%' } },
    { id: 25, name: 'Ginger Cookie', price: 7250, icon: '🍪', image: 'Подарки/GingerCookie-7250.png', description: 'Collectible #2023', specs: { Model: 'Ginger Cookie 3%', Backdrop: 'Special 6%', Symbol: 'Decor 0.7%' } },
    { id: 26, name: 'Voodoo Doll', price: 7460, icon: '🪆', image: 'Подарки/VoodooDoll-7460.png', description: 'Collectible #2024', specs: { Model: 'Voodoo Doll 3%', Backdrop: 'Dark 5%', Symbol: 'Mystery 0.6%' } },
    { id: 27, name: 'Bow Tie', price: 8000, icon: '🎀', image: 'Подарки/BowTie-8000.png', description: 'Collectible #2025', specs: { Model: 'Bow Tie 2%', Backdrop: 'Royal 5%', Symbol: 'Noble 0.6%' } },
    
    // ========== ДОРОГИЕ ПОДАРКИ (10000₽+) - 6 шт ==========
    
    { id: 28, name: 'Eternal Rose', price: 11000, icon: '🌹', image: 'Подарки/EternalRose-11000.png', description: 'Collectible #3001', specs: { Model: 'Eternal Rose 1.5%', Backdrop: 'Romantic 3%', Symbol: 'Love 0.4%' } },
    { id: 29, name: 'Voodoo Doll', price: 12000, icon: '🪆', image: 'Подарки/VoodooDoll-12000.png', description: 'Collectible #3002', specs: { Model: 'Voodoo Doll 1.2%', Backdrop: 'Cursed 2.5%', Symbol: 'Hex 0.3%' } },
    { id: 30, name: 'Vintage Cigar', price: 12300, icon: '🚬', image: 'Подарки/VintageCigar-12300.png', description: 'Collectible #3003', specs: { Model: 'Vintage Cigar 1%', Backdrop: 'Luxury 2%', Symbol: 'Smoke 0.3%' } },
    { id: 31, name: 'Top Hat', price: 14500, icon: '🎩', image: 'Подарки/TopHat-14500.png', description: 'Collectible #3004', specs: { Model: 'Top Hat 0.8%', Backdrop: 'Elite 1.8%', Symbol: 'Prestige 0.2%' } },
    { id: 32, name: 'Vintage Cigar', price: 21000, icon: '🚬', image: 'Подарки/VintageCigar-21000.png', description: 'Collectible #3005', specs: { Model: 'Vintage Cigar 0.5%', Backdrop: 'Rare 1.2%', Symbol: 'Aged 0.15%' } },
    { id: 33, name: 'Astral Shard', price: 31000, icon: '💎', image: 'Подарки/AstralShard-31000.png', description: 'Collectible #3006', specs: { Model: 'Astral Shard 0.3%', Backdrop: 'Cosmic 0.8%', Symbol: 'Crystal 0.1%' } },
];
