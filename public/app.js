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

// Примерные товары
const products = [
    { id: 1, name: 'Steam Аккаунт', price: 500, category: 'accounts', seller: 'TopSeller', rating: 4.9, icon: '🎮', description: 'Аккаунт Steam с играми', specs: { Игр: '50+', Уровень: '20', Статус: 'Активен' } },
    { id: 2, name: 'Discord Nitro', price: 350, category: 'services', seller: 'FastDelivery', rating: 4.8, icon: '💬', description: 'Discord Nitro на 1 месяц', specs: { Срок: '1 месяц', Доставка: 'Моментально', Гарантия: '7 дней' } },
    { id: 3, name: 'Spotify Premium', price: 200, category: 'services', seller: 'MusicShop', rating: 4.7, icon: '🎵', description: 'Подписка Spotify Premium', specs: { Срок: '1 месяц', Страна: 'RU', Гарантия: '30 дней' } },
    { id: 4, name: 'Minecraft Account', price: 450, category: 'games', seller: 'GameStore', rating: 4.9, icon: '⛏️', description: 'Лицензионный аккаунт Minecraft', specs: { Доступ: 'Полный', Версия: 'Java Edition', Статус: 'Активен' } },
    { id: 5, name: 'VPN Premium', price: 300, category: 'software', seller: 'SecureNet', rating: 4.6, icon: '🔒', description: 'VPN подписка на 1 месяц', specs: { Срок: '1 месяц', Скорость: 'Безлимит', Серверы: '50+' } },
    { id: 6, name: 'ChatGPT Plus', price: 800, category: 'services', seller: 'AIShop', rating: 4.9, icon: '🤖', description: 'Подписка ChatGPT Plus', specs: { Срок: '1 месяц', Модель: 'GPT-4', Статус: 'Активна' } },
    { id: 7, name: 'Adobe Account', price: 1200, category: 'software', seller: 'CreativeStore', rating: 4.8, icon: '🎨', description: 'Adobe Creative Cloud', specs: { Срок: '1 год', Программы: 'Все', Обновления: 'Автоматические' } },
    { id: 8, name: 'YouTube Premium', price: 250, category: 'services', seller: 'MediaHub', rating: 4.7, icon: '📺', description: 'YouTube Premium подписка', specs: { Срок: '1 месяц', Реклама: 'Отключена', Музыка: 'Включена' } },
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
            <div class="product-seller-name">👤 ${product.seller}</div>
            <div class="product-bottom">
                <div class="product-price-value">${product.price} ₽</div>
                <div class="product-rating">⭐ ${product.rating}</div>
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
    // Категории
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const category = item.dataset.category;
            selectedCategory = category;
            renderProducts(category);
            
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
        });
    });
    
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
