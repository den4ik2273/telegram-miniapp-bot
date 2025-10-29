// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Состояние приложения
let selectedCategory = 'all';
let currentProduct = null;

// Products массив загружается из gifts-data.js

// Инициализация
function init() {
    displayUserInfo();
    renderProducts();
    setupEventListeners();
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
                ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-nft-image">` : product.icon}
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
    
    // Отображаем изображение или иконку
    const productImageEl = document.getElementById('productImage');
    if (currentProduct.image) {
        productImageEl.innerHTML = `<img src="${currentProduct.image}" alt="${currentProduct.name}" class="product-nft-image">`;
    } else {
        productImageEl.textContent = currentProduct.icon;
    }
    
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
            tg.showAlert(`${currentProduct.name}\n\nПокупка товаров будет доступна в следующем обновлении! 🎁`);
        }
    });
    
    // Кнопка пополнения баланса
    document.getElementById('addBalanceBtn').addEventListener('click', () => {
        showAddBalanceDialog();
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

// Функция для показа диалога пополнения баланса
function showAddBalanceDialog() {
    // Запрашиваем сумму у пользователя
    tg.showPopup({
        title: '💰 Пополнение баланса',
        message: 'Введите сумму для пополнения (в рублях):',
        buttons: [
            { id: 'cancel', type: 'cancel' },
            { id: 'confirm', type: 'default', text: 'Продолжить' }
        ]
    }, (buttonId) => {
        if (buttonId === 'confirm') {
            // Показываем промпт для ввода суммы
            tg.showPopup({
                title: 'Введите сумму',
                message: 'Минимум: 10 ₽\nКурс: 1 ₽ = 1 ⭐',
                buttons: [
                    { id: 'cancel', type: 'cancel' },
                    { id: '100', type: 'default', text: '100 ₽' },
                    { id: '500', type: 'default', text: '500 ₽' },
                    { id: '1000', type: 'default', text: '1000 ₽' },
                    { id: 'custom', type: 'default', text: 'Другая сумма' }
                ]
            }, (selectedId) => {
                if (selectedId && selectedId !== 'cancel') {
                    let amount = 0;
                    
                    if (selectedId === 'custom') {
                        // Для custom показываем input через prompt (так как Telegram Web App не поддерживает text input)
                        const customAmount = prompt('Введите сумму в рублях (минимум 10 ₽):');
                        amount = parseInt(customAmount);
                    } else {
                        amount = parseInt(selectedId);
                    }
                    
                    if (amount && amount >= 10) {
                        createStarsInvoice(amount);
                    } else {
                        tg.showAlert('Минимальная сумма пополнения: 10 ₽');
                    }
                }
            });
        }
    });
}

// Функция для создания инвойса Telegram Stars
async function createStarsInvoice(amount) {
    try {
        // Отправляем запрос на сервер для создания инвойса
        const response = await fetch('/api/create-invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                userId: user?.id || 'unknown'
            })
        });

        const data = await response.json();
        
        if (data.success && data.invoiceLink) {
            // Открываем инвойс для оплаты
            tg.openInvoice(data.invoiceLink, (status) => {
                if (status === 'paid') {
                    tg.showAlert(`✅ Баланс успешно пополнен на ${amount} ₽!`);
                    // Обновляем баланс пользователя
                    updateUserBalance(amount);
                } else if (status === 'cancelled') {
                    tg.showAlert('Оплата отменена');
                } else if (status === 'failed') {
                    tg.showAlert('Ошибка оплаты. Попробуйте снова.');
                }
            });
        } else {
            tg.showAlert('Ошибка создания платежа. Попробуйте позже.');
        }
    } catch (error) {
        console.error('Error creating invoice:', error);
        tg.showAlert('Ошибка соединения с сервером');
    }
}

// Функция для обновления баланса пользователя
function updateUserBalance(amount) {
    const balanceElement = document.querySelector('.balance-amount');
    if (balanceElement) {
        const currentBalance = parseInt(balanceElement.textContent) || 0;
        const newBalance = currentBalance + amount;
        balanceElement.textContent = `${newBalance} ₽`;
    }
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
