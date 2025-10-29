// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Состояние приложения
let cart = [];
let selectedCategory = 'all';
let currentProduct = null;

// Реальные Telegram NFT Подарки из Fragment/Portals (70 штук)
const products = [
    { id: 1, name: 'Delicious Cake', price: 2500, icon: '🎂', description: 'Collectible #2847', specs: { Model: 'Delicious Cake', Backdrop: 'Party', Issued: '2,847/3,000' } },
    { id: 2, name: 'Green Star', price: 1800, icon: '⭐', description: 'Collectible #1523', specs: { Model: 'Green Star', Backdrop: 'Emerald', Issued: '1,523/2,500' } },
    { id: 3, name: 'Blue Star', price: 1500, icon: '⭐', description: 'Collectible #876', specs: { Model: 'Blue Star', Backdrop: 'Ocean', Issued: '876/2,500' } },
    { id: 4, name: 'Red Star', price: 1600, icon: '⭐', description: 'Collectible #1209', specs: { Model: 'Red Star', Backdrop: 'Crimson', Issued: '1,209/2,500' } },
    { id: 5, name: 'Plush Pepe', price: 29000, icon: '🐸', description: 'Collectible #1462', specs: { Model: 'Pepe La Rana 2%', Backdrop: 'Pacific Green 1%', Symbol: 'High Heels 0.5%' } },
    { id: 6, name: 'Golden Pepe', price: 35000, icon: '🐸', description: 'Collectible #247', specs: { Model: 'Golden Pepe 0.8%', Backdrop: 'Gold Bars 0.5%', Symbol: 'Crown 0.3%' } },
    { id: 7, name: 'Fire Pepe', price: 18000, icon: '🐸', description: 'Collectible #892', specs: { Model: 'Fire Pepe 3%', Backdrop: 'Flames 2%', Symbol: 'Torch 1%' } },
    { id: 8, name: 'Heroic Helmet', price: 55000, icon: '⚔️', description: 'Collectible #1', specs: { Model: 'Heroic Helmet 0.1%', Backdrop: 'Battle Field', Symbol: 'Sword' } },
    { id: 9, name: 'Blue Star With Hat', price: 3200, icon: '⭐', description: 'Collectible #456', specs: { Model: 'Blue Star', Backdrop: 'Sky', Symbol: 'Top Hat 5%' } },
    { id: 10, name: 'Pink Star', price: 1700, icon: '⭐', description: 'Collectible #1834', specs: { Model: 'Pink Star', Backdrop: 'Rose Garden', Issued: '1,834/2,500' } },
    { id: 11, name: 'Purple Star', price: 1900, icon: '⭐', description: 'Collectible #967', specs: { Model: 'Purple Star', Backdrop: 'Violet Sky', Issued: '967/2,500' } },
    { id: 12, name: 'Golden Star', price: 12000, icon: '⭐', description: 'Collectible #89', specs: { Model: 'Golden Star 1%', Backdrop: 'Gold Rush', Symbol: 'Shine' } },
    { id: 13, name: 'Orange Star', price: 1650, icon: '⭐', description: 'Collectible #1456', specs: { Model: 'Orange Star', Backdrop: 'Sunset', Issued: '1,456/2,500' } },
    { id: 14, name: 'Ghost on Pink', price: 4500, icon: '👻', description: 'Collectible #234', specs: { Model: 'Ghost', Backdrop: 'Pink Clouds 8%', Symbol: 'Sparkles' } },
    { id: 15, name: 'Ghost on Blue', price: 3800, icon: '👻', description: 'Collectible #567', specs: { Model: 'Ghost', Backdrop: 'Blue Mist 12%', Issued: '567/1,500' } },
    { id: 16, name: 'Ghost on Green', price: 4200, icon: '👻', description: 'Collectible #789', specs: { Model: 'Ghost', Backdrop: 'Green Forest 10%', Issued: '789/1,500' } },
    { id: 17, name: 'Birthday Cake Deluxe', price: 5500, icon: '🎂', description: 'Collectible #123', specs: { Model: 'Birthday Cake', Backdrop: 'Party 5%', Symbol: 'Candles 3%' } },
    { id: 18, name: 'Disco Ball', price: 6200, icon: '🪩', description: 'Collectible #345', specs: { Model: 'Disco Ball 2%', Backdrop: 'Dance Floor', Symbol: 'Lights' } },
    { id: 19, name: 'Blue Fire', price: 8500, icon: '🔥', description: 'Collectible #156', specs: { Model: 'Blue Fire 1.5%', Backdrop: 'Ice & Fire', Issued: '156/800' } },
    { id: 20, name: 'Purple Fire', price: 9200, icon: '🔥', description: 'Collectible #98', specs: { Model: 'Purple Fire 1.2%', Backdrop: 'Magic', Symbol: 'Stars' } },
    { id: 21, name: 'Rainbow Fire', price: 15000, icon: '🔥', description: 'Collectible #27', specs: { Model: 'Rainbow Fire 0.5%', Backdrop: 'Aurora', Symbol: 'Shine' } },
    { id: 22, name: 'Red Gift Box', price: 2100, icon: '🎁', description: 'Collectible #1678', specs: { Model: 'Gift Box', Backdrop: 'Red 25%', Issued: '1,678/3,000' } },
    { id: 23, name: 'Blue Gift Box', price: 1950, icon: '🎁', description: 'Collectible #2134', specs: { Model: 'Gift Box', Backdrop: 'Blue 28%', Issued: '2,134/3,000' } },
    { id: 24, name: 'Golden Gift Box', price: 8900, icon: '🎁', description: 'Collectible #234', specs: { Model: 'Gift Box', Backdrop: 'Gold 2%', Symbol: 'Ribbon 1%' } },
    { id: 25, name: 'Party Popper Deluxe', price: 3400, icon: '🎉', description: 'Collectible #567', specs: { Model: 'Party Popper', Backdrop: 'Confetti 15%', Symbol: 'Stars' } },
    { id: 26, name: 'Heart Red', price: 2800, icon: '❤️', description: 'Collectible #1234', specs: { Model: 'Heart', Backdrop: 'Roses', Issued: '1,234/2,000' } },
    { id: 27, name: 'Heart Pink', price: 2600, icon: '💖', description: 'Collectible #1567', specs: { Model: 'Heart', Backdrop: 'Pink Sky', Issued: '1,567/2,000' } },
    { id: 28, name: 'Heart Golden', price: 11000, icon: '💛', description: 'Collectible #178', specs: { Model: 'Heart', Backdrop: 'Gold 1.8%', Symbol: 'Crown' } },
    { id: 29, name: 'Balloon Red', price: 1850, icon: '🎈', description: 'Collectible #2345', specs: { Model: 'Balloon', Backdrop: 'Sky', Issued: '2,345/3,500' } },
    { id: 30, name: 'Balloon Blue', price: 1750, icon: '🎈', description: 'Collectible #2567', specs: { Model: 'Balloon', Backdrop: 'Clouds', Issued: '2,567/3,500' } },
    { id: 31, name: 'Balloon Rainbow', price: 7200, icon: '🎈', description: 'Collectible #289', specs: { Model: 'Balloon', Backdrop: 'Rainbow 3%', Symbol: 'Stars' } },
    { id: 32, name: 'Fireworks Red', price: 3900, icon: '🎆', description: 'Collectible #678', specs: { Model: 'Fireworks', Backdrop: 'Night 18%', Issued: '678/1,200' } },
    { id: 33, name: 'Fireworks Blue', price: 4100, icon: '🎆', description: 'Collectible #567', specs: { Model: 'Fireworks', Backdrop: 'Blue Night 15%', Issued: '567/1,200' } },
    { id: 34, name: 'Fireworks Golden', price: 13500, icon: '🎆', description: 'Collectible #67', specs: { Model: 'Fireworks', Backdrop: 'Gold Sky 1%', Symbol: 'Stars' } },
    { id: 35, name: 'Crown Silver', price: 6800, icon: '👑', description: 'Collectible #345', specs: { Model: 'Crown', Backdrop: 'Silver 4%', Symbol: 'Gems' } },
    { id: 36, name: 'Crown Golden', price: 14500, icon: '👑', description: 'Collectible #89', specs: { Model: 'Crown', Backdrop: 'Gold 1.5%', Symbol: 'Diamonds 0.8%' } },
    { id: 37, name: 'Crown Diamond', price: 28000, icon: '👑', description: 'Collectible #12', specs: { Model: 'Crown', Backdrop: 'Diamonds 0.3%', Symbol: 'Royal' } },
    { id: 38, name: 'Trophy Bronze', price: 3200, icon: '🏆', description: 'Collectible #1234', specs: { Model: 'Trophy', Backdrop: 'Bronze', Issued: '1,234/2,000' } },
    { id: 39, name: 'Trophy Silver', price: 5600, icon: '🏆', description: 'Collectible #456', specs: { Model: 'Trophy', Backdrop: 'Silver 6%', Issued: '456/1,000' } },
    { id: 40, name: 'Trophy Golden', price: 12500, icon: '🏆', description: 'Collectible #123', specs: { Model: 'Trophy', Backdrop: 'Gold 2%', Symbol: 'Champion' } },
    { id: 41, name: 'Diamond Blue', price: 9800, icon: '💎', description: 'Collectible #234', specs: { Model: 'Diamond', Backdrop: 'Blue 2.5%', Symbol: 'Shine' } },
    { id: 42, name: 'Diamond Pink', price: 11200, icon: '💎', description: 'Collectible #178', specs: { Model: 'Diamond', Backdrop: 'Pink 1.8%', Symbol: 'Sparkle' } },
    { id: 43, name: 'Diamond Rainbow', price: 22000, icon: '💎', description: 'Collectible #45', specs: { Model: 'Diamond', Backdrop: 'Rainbow 0.6%', Symbol: 'Luxury' } },
    { id: 44, name: 'Rocket Red', price: 4500, icon: '🚀', description: 'Collectible #789', specs: { Model: 'Rocket', Backdrop: 'Mars 12%', Issued: '789/1,500' } },
    { id: 45, name: 'Rocket Blue', price: 4800, icon: '🚀', description: 'Collectible #678', specs: { Model: 'Rocket', Backdrop: 'Space 10%', Issued: '678/1,500' } },
    { id: 46, name: 'Rocket Golden', price: 16000, icon: '🚀', description: 'Collectible #56', specs: { Model: 'Rocket', Backdrop: 'Gold Stars 1%', Symbol: 'Moon' } },
    { id: 47, name: 'Lightning Yellow', price: 3600, icon: '⚡', description: 'Collectible #987', specs: { Model: 'Lightning', Backdrop: 'Storm 15%', Issued: '987/1,800' } },
    { id: 48, name: 'Lightning Blue', price: 4200, icon: '⚡', description: 'Collectible #765', specs: { Model: 'Lightning', Backdrop: 'Electric 12%', Issued: '765/1,800' } },
    { id: 49, name: 'Lightning Purple', price: 9500, icon: '⚡', description: 'Collectible #156', specs: { Model: 'Lightning', Backdrop: 'Purple Sky 2%', Symbol: 'Power' } },
    { id: 50, name: 'Rainbow Classic', price: 5200, icon: '🌈', description: 'Collectible #456', specs: { Model: 'Rainbow', Backdrop: 'Sky 8%', Issued: '456/1,200' } },
    { id: 51, name: 'Rainbow Double', price: 12800, icon: '🌈', description: 'Collectible #89', specs: { Model: 'Double Rainbow 1.5%', Backdrop: 'Clouds', Symbol: 'Magic' } },
    { id: 52, name: 'Rose Red', price: 2900, icon: '🌹', description: 'Collectible #1456', specs: { Model: 'Rose', Backdrop: 'Garden', Issued: '1,456/2,200' } },
    { id: 53, name: 'Rose Golden', price: 10500, icon: '🌹', description: 'Collectible #167', specs: { Model: 'Rose', Backdrop: 'Gold 2.2%', Symbol: 'Petals' } },
    { id: 54, name: 'Rose Rainbow', price: 18500, icon: '🌹', description: 'Collectible #34', specs: { Model: 'Rose', Backdrop: 'Rainbow 0.7%', Symbol: 'Sparkle' } },
    { id: 55, name: 'Cherry Blossom', price: 4600, icon: '🌸', description: 'Collectible #678', specs: { Model: 'Cherry Blossom', Backdrop: 'Spring 10%', Symbol: 'Petals' } },
    { id: 56, name: 'Sunflower', price: 3800, icon: '🌻', description: 'Collectible #890', specs: { Model: 'Sunflower', Backdrop: 'Field 14%', Issued: '890/1,600' } },
    { id: 57, name: 'Four Leaf Clover', price: 8900, icon: '🍀', description: 'Collectible #234', specs: { Model: 'Clover 2%', Backdrop: 'Luck', Symbol: 'Gold' } },
    { id: 58, name: 'Christmas Tree', price: 5500, icon: '🎄', description: 'Collectible #567', specs: { Model: 'Christmas Tree', Backdrop: 'Snow 7%', Symbol: 'Star' } },
    { id: 59, name: 'Snowflake Blue', price: 4300, icon: '❄️', description: 'Collectible #789', specs: { Model: 'Snowflake', Backdrop: 'Ice 11%', Issued: '789/1,400' } },
    { id: 60, name: 'Snowflake Rainbow', price: 13200, icon: '❄️', description: 'Collectible #78', specs: { Model: 'Snowflake', Backdrop: 'Rainbow Ice 1.3%', Symbol: 'Crystal' } },
    { id: 61, name: 'Pumpkin', price: 4100, icon: '🎃', description: 'Collectible #678', specs: { Model: 'Pumpkin', Backdrop: 'Halloween 12%', Symbol: 'Spooky' } },
    { id: 62, name: 'Candy Cane', price: 3400, icon: '🍬', description: 'Collectible #1123', specs: { Model: 'Candy Cane', Backdrop: 'Sweet', Issued: '1,123/1,800' } },
    { id: 63, name: 'Lollipop Rainbow', price: 6700, icon: '🍭', description: 'Collectible #345', specs: { Model: 'Lollipop', Backdrop: 'Rainbow 4%', Symbol: 'Swirl' } },
    { id: 64, name: 'Ice Cream Rainbow', price: 7200, icon: '🍦', description: 'Collectible #289', specs: { Model: 'Ice Cream', Backdrop: 'Rainbow 3.5%', Symbol: 'Cherry' } },
    { id: 65, name: 'Donut Pink', price: 3100, icon: '🍩', description: 'Collectible #1345', specs: { Model: 'Donut', Backdrop: 'Pink 16%', Issued: '1,345/1,900' } },
    { id: 66, name: 'Donut Rainbow', price: 8400, icon: '🍩', description: 'Collectible #234', specs: { Model: 'Donut', Backdrop: 'Rainbow 2.8%', Symbol: 'Sprinkles' } },
    { id: 67, name: 'Cupcake Pink', price: 2900, icon: '🧁', description: 'Collectible #1567', specs: { Model: 'Cupcake', Backdrop: 'Sweet', Issued: '1,567/2,100' } },
    { id: 68, name: 'Cupcake Rainbow', price: 7800, icon: '🧁', description: 'Collectible #267', specs: { Model: 'Cupcake', Backdrop: 'Rainbow 3.2%', Symbol: 'Cherry' } },
    { id: 69, name: 'Cookie Chocolate', price: 2700, icon: '🍪', description: 'Collectible #1789', specs: { Model: 'Cookie', Backdrop: 'Chocolate', Issued: '1,789/2,300' } },
    { id: 70, name: 'Crystal Ball', price: 19500, icon: '🔮', description: 'Collectible #56', specs: { Model: 'Crystal Ball 0.9%', Backdrop: 'Mystic', Symbol: 'Fortune' } },
];

// Инициализация
function init() {
    displayUserInfo();
    renderProducts();
    setupEventListeners();
    updateCartBadge();
}

// Отображение информации о пользователе
function displayUserInfo() {
    const userNameElement = document.getElementById('userName');
    const userAvatarElement = document.getElementById('userAvatar');
    const profileNameElement = document.getElementById('profileName');
    const profileIdElement = document.getElementById('profileId');
    const profileAvatarElement = document.getElementById('profileAvatar');

    if (user) {
        const firstName = user.first_name || 'Пользователь';
        const lastName = user.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim();
        const initial = firstName[0]?.toUpperCase() || '👤';
        
        userNameElement.textContent = fullName;
        userAvatarElement.textContent = initial;
        
        if (profileNameElement) profileNameElement.textContent = fullName;
        if (profileIdElement) profileIdElement.textContent = `ID: ${user.id}`;
        if (profileAvatarElement) profileAvatarElement.textContent = initial;
    }
}

// Отображение товаров
function renderProducts(category = 'all') {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image-container">
                ${product.icon}
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-bottom">
                <div class="product-price-value">${product.price} ₽</div>
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            showProduct(id);
        });
    });
}

// Показать детальную страницу товара
function showProduct(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productPrice').textContent = `${currentProduct.price} ₽`;
    document.getElementById('productImage').textContent = currentProduct.icon;
    document.getElementById('productDescription').textContent = currentProduct.description;
    
    // Характеристики
    const specsHtml = Object.entries(currentProduct.specs).map(([key, value]) => `
        <div class="spec-item">
            <strong>${key}:</strong>
            <span>${value}</span>
        </div>
    `).join('');
    document.getElementById('productSpecs').innerHTML = specsHtml;
    
    showPage('productPage');
    
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// Навигация между страницами
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Обновляем активную кнопку навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageId) {
            item.classList.add('active');
        }
    });
    
    // Скроллим вверх
    window.scrollTo(0, 0);
}

// Добавить в корзину
function addToCart(product) {
    cart.push(product);
    updateCartBadge();
    tg.showAlert(`${product.name} добавлен в корзину! 🛒`);
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }
}

// Обновить счетчик корзины
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    badge.textContent = cart.length;
    badge.style.display = cart.length > 0 ? 'flex' : 'none';
}

// Показать корзину
function showCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🛒</span>
                <p>Корзина пуста</p>
                <button class="btn-primary" onclick="showPage('homePage')">Продолжить покупки</button>
            </div>
        `;
        cartSummary.style.display = 'none';
    } else {
        // Отображаем товары в корзине
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.icon}</span>
                <div>
                    <div>${item.name}</div>
                    <div>${item.price} ₽</div>
                </div>
            </div>
        `).join('');
        
        document.getElementById('cartSubtotal').textContent = `${total} ₽`;
        document.getElementById('cartTotal').textContent = `${total} ₽`;
        cartSummary.style.display = 'block';
    }
    
    showPage('cartPage');
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Навигация
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.dataset.page;
            if (pageId) showPage(pageId);
            
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
        });
    });
    
    // Кнопка назад на странице товара
    document.getElementById('backBtn').addEventListener('click', () => {
        showPage('homePage');
    });
    
    document.getElementById('cartBackBtn').addEventListener('click', () => {
        showPage('homePage');
    });
    
    document.getElementById('profileBackBtn').addEventListener('click', () => {
        showPage('homePage');
    });
    
    // Кнопка покупки
    document.getElementById('buyBtn').addEventListener('click', () => {
        if (currentProduct) {
            addToCart(currentProduct);
        }
    });
    
    // Кнопка корзины в header
    document.getElementById('cartBtn').addEventListener('click', () => {
        showCart();
    });
    
    // Кнопка поиска
    document.getElementById('searchBtn').addEventListener('click', () => {
        tg.showAlert('Функция поиска в разработке 🔍');
    });
    
    // Главная кнопка Telegram
    tg.MainButton.text = "Закрыть";
    tg.MainButton.onClick(() => {
        tg.close();
    });
    tg.MainButton.show();
}

// Применяем тему Telegram
function applyTheme() {
    const root = document.documentElement;
    
    if (tg.themeParams) {
        if (tg.themeParams.bg_color) {
            root.style.setProperty('--tg-bg', tg.themeParams.bg_color);
        }
    }
}

// Обработка вибрации для всех кнопок
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    }
});

// Управление Splash Screen
function hideSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const mainApp = document.getElementById('mainApp');
    
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        mainApp.style.opacity = '1';
    }, 3000);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Запускаем splash screen
    hideSplashScreen();
    
    // Инициализируем приложение
    setTimeout(() => {
        init();
        applyTheme();
        console.log('Market Mini App initialized');
    }, 2500);
});

// Обработка изменения темы
tg.onEvent('themeChanged', () => {
    applyTheme();
});
