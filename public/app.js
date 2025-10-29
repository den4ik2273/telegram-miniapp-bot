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

// Telegram NFT Подарки (70 штук)
const products = [
    { id: 1, name: 'Delicious Cake', price: 2500, icon: '🎂', description: 'Premium collectible gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 2, name: 'Green Star', price: 1800, icon: '💚', description: 'Rare star collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 3, name: 'Blue Star', price: 1500, icon: '💙', description: 'Classic star gift', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 4, name: 'Red Star', price: 1600, icon: '❤️', description: 'Passionate star collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 5, name: 'Pizza Slice', price: 2200, icon: '🍕', description: 'Delicious NFT collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 6, name: 'French Fries', price: 1900, icon: '🍟', description: 'Tasty collectible gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 7, name: 'Ghost', price: 3500, icon: '👻', description: 'Spooky rare collectible', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 8, name: 'Fire', price: 3200, icon: '🔥', description: 'Hot legendary gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 9, name: 'Thunder Cloud', price: 2800, icon: '⛈️', description: 'Electric collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 10, name: 'Rainbow', price: 4500, icon: '🌈', description: 'Colorful rare gift', specs: { Редкость: 'Mythic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 11, name: 'Unicorn', price: 5200, icon: '🦄', description: 'Magical mythic collectible', specs: { Редкость: 'Mythic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 12, name: 'Dragon', price: 6500, icon: '🐉', description: 'Epic dragon gift', specs: { Редкость: 'Mythic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 13, name: 'Crown', price: 4800, icon: '👑', description: 'Royal premium gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 14, name: 'Diamond', price: 7500, icon: '💎', description: 'Precious rare collectible', specs: { Редкость: 'Mythic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 15, name: 'Golden Trophy', price: 5500, icon: '🏆', description: 'Champion gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 16, name: 'Rocket', price: 3800, icon: '🚀', description: 'Space collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 17, name: 'Planet Earth', price: 4200, icon: '🌍', description: 'Global rare gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 18, name: 'Moon', price: 3600, icon: '🌙', description: 'Lunar collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 19, name: 'Sun', price: 4100, icon: '☀️', description: 'Bright legendary gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 20, name: 'Lightning Bolt', price: 2900, icon: '⚡', description: 'Electric rare gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 21, name: 'Rose', price: 2100, icon: '🌹', description: 'Romantic collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 22, name: 'Sunflower', price: 1700, icon: '🌻', description: 'Sunny gift', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 23, name: 'Cherry Blossom', price: 2400, icon: '🌸', description: 'Spring collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 24, name: 'Four Leaf Clover', price: 5800, icon: '🍀', description: 'Lucky legendary gift', specs: { Редкость: 'Mythic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 25, name: 'Christmas Tree', price: 3300, icon: '🎄', description: 'Holiday collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 26, name: 'Gift Box', price: 1400, icon: '🎁', description: 'Classic gift', specs: { Редкость: 'Common', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 27, name: 'Party Popper', price: 1900, icon: '🎉', description: 'Celebration gift', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 28, name: 'Balloon', price: 1200, icon: '🎈', description: 'Fun collectible', specs: { Редкость: 'Common', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 29, name: 'Confetti Ball', price: 1600, icon: '🎊', description: 'Party collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 30, name: 'Fireworks', price: 3400, icon: '🎆', description: 'Spectacular gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 31, name: 'Ice Cream', price: 1800, icon: '🍦', description: 'Sweet collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 32, name: 'Cupcake', price: 1500, icon: '🧁', description: 'Cute gift', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 33, name: 'Candy', price: 1300, icon: '🍬', description: 'Tasty collectible', specs: { Редкость: 'Common', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 34, name: 'Lollipop', price: 1400, icon: '🍭', description: 'Sweet gift', specs: { Редкость: 'Common', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 35, name: 'Chocolate Bar', price: 1600, icon: '🍫', description: 'Delicious collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 36, name: 'Donut', price: 1700, icon: '🍩', description: 'Glazed gift', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 37, name: 'Cookie', price: 1500, icon: '🍪', description: 'Crunchy collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 38, name: 'Birthday Cake', price: 2600, icon: '🎂', description: 'Celebration gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 39, name: 'Watermelon', price: 1900, icon: '🍉', description: 'Juicy collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 40, name: 'Strawberry', price: 1600, icon: '🍓', description: 'Fresh gift', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 41, name: 'Peach', price: 1700, icon: '🍑', description: 'Sweet collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 42, name: 'Pineapple', price: 2000, icon: '🍍', description: 'Tropical gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 43, name: 'Avocado', price: 2100, icon: '🥑', description: 'Healthy collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 44, name: 'Burger', price: 2300, icon: '🍔', description: 'Fast food gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 45, name: 'Hot Dog', price: 1800, icon: '🌭', description: 'Classic collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 46, name: 'Taco', price: 2000, icon: '🌮', description: 'Mexican gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 47, name: 'Sushi', price: 2400, icon: '🍣', description: 'Japanese collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 48, name: 'Ramen', price: 2200, icon: '🍜', description: 'Tasty gift', specs: { Редкість: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 49, name: 'Coffee', price: 1700, icon: '☕', description: 'Energy collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 50, name: 'Tea Cup', price: 1600, icon: '🍵', description: 'Relaxing gift', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 51, name: 'Wine Glass', price: 2500, icon: '🍷', description: 'Elegant collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 52, name: 'Cocktail', price: 2300, icon: '🍹', description: 'Party gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 53, name: 'Bear', price: 2700, icon: '🐻', description: 'Cute collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 54, name: 'Panda', price: 3100, icon: '🐼', description: 'Rare bear gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 55, name: 'Tiger', price: 3900, icon: '🐯', description: 'Wild collectible', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 56, name: 'Lion', price: 4200, icon: '🦁', description: 'King gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 57, name: 'Monkey', price: 2600, icon: '🐵', description: 'Funny collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 58, name: 'Elephant', price: 3500, icon: '🐘', description: 'Big gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 59, name: 'Dolphin', price: 3000, icon: '🐬', description: 'Ocean collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 60, name: 'Whale', price: 4500, icon: '🐋', description: 'Legendary ocean gift', specs: { Редкость: 'Mythic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 61, name: 'Shark', price: 3700, icon: '🦈', description: 'Predator collectible', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 62, name: 'Butterfly', price: 2100, icon: '🦋', description: 'Beautiful gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 63, name: 'Ladybug', price: 1800, icon: '🐞', description: 'Lucky collectible', specs: { Редкость: 'Rare', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 64, name: 'Eagle', price: 3600, icon: '🦅', description: 'Freedom gift', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 65, name: 'Owl', price: 3200, icon: '🦉', description: 'Wise collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 66, name: 'Penguin', price: 2800, icon: '🐧', description: 'Arctic gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 67, name: 'Turtle', price: 2500, icon: '🐢', description: 'Slow collectible', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 68, name: 'Frog', price: 2200, icon: '🐸', description: 'Green gift', specs: { Редкость: 'Epic', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 69, name: 'Octopus', price: 3400, icon: '🐙', description: 'Eight arms collectible', specs: { Редкость: 'Legendary', Выпуск: '2024', Тип: 'NFT Gift' } },
    { id: 70, name: 'Crystal Ball', price: 6800, icon: '🔮', description: 'Mystical mythic gift', specs: { Редкость: 'Mythic', Выпуск: '2024', Тип: 'NFT Gift' } },
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
