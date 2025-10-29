// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Состояние приложения
let selectedCategory = 'all';
let currentProduct = null;
let userBalance = 0;

// Products массив загружается из gifts-data.js

// Инициализация
function init() {
    loadUserBalance();
    displayUserInfo();
    renderProducts();
    setupEventListeners();
}

// Отображение информации о пользователе
async function displayUserInfo() {
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
        
        if (profileNameElement) profileNameElement.textContent = fullName;
        if (profileIdElement) profileIdElement.textContent = `ID: ${user.id}`;
        
        // Загружаем фото профиля
        const photoUrl = await loadUserPhoto(user.id);
        
        if (photoUrl) {
            // Если есть фото, отображаем его
            userAvatarElement.innerHTML = `<img src="${photoUrl}" alt="Avatar" class="avatar-img">`;
            if (profileAvatarElement) {
                profileAvatarElement.innerHTML = `<img src="${photoUrl}" alt="Avatar" class="avatar-img">`;
            }
        } else {
            // Если нет фото, показываем инициал
            userAvatarElement.textContent = initial;
            if (profileAvatarElement) {
                profileAvatarElement.textContent = initial;
            }
        }
    }
}

// Функция для загрузки баланса из localStorage
function loadUserBalance() {
    if (user && user.id) {
        const savedBalance = localStorage.getItem(`user_balance_${user.id}`);
        userBalance = savedBalance ? parseInt(savedBalance) : 0;
        updateBalanceDisplay();
        console.log('💰 Loaded balance:', userBalance, '₽');
    }
}

// Функция для сохранения баланса в localStorage
function saveUserBalance() {
    if (user && user.id) {
        localStorage.setItem(`user_balance_${user.id}`, userBalance.toString());
        console.log('💾 Balance saved:', userBalance, '₽');
    }
}

// Функция для обновления отображения баланса во всех местах
function updateBalanceDisplay() {
    // Обновляем в карточке пользователя (главная страница)
    const balanceAmountElements = document.querySelectorAll('.balance-amount');
    balanceAmountElements.forEach(el => {
        el.textContent = `${userBalance} ₽`;
    });
    
    // Обновляем в статистике профиля
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 3) {
        const balanceStatValue = statCards[2].querySelector('.stat-value');
        if (balanceStatValue) {
            balanceStatValue.textContent = `${userBalance} ₽`;
        }
    }
}

// Функция для загрузки фото профиля пользователя
async function loadUserPhoto(userId) {
    try {
        const response = await fetch('/api/get-user-photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
        });
        
        const data = await response.json();
        
        if (data.success && data.photoUrl) {
            console.log('✅ User photo loaded:', data.photoUrl);
            return data.photoUrl;
        }
        
        return null;
    } catch (error) {
        console.error('Error loading user photo:', error);
        return null;
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
        showPage('addBalancePage');
        resetAddBalancePage();
    });
    
    // Кнопка настроек
    document.getElementById('settingsBtn').addEventListener('click', () => {
        showPage('profilePage');
        
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    });
    
    // Кнопка назад на странице пополнения
    document.getElementById('addBalanceBackBtn').addEventListener('click', () => {
        showPage('homePage');
    });
    
    // Поле ввода суммы
    document.getElementById('amountInput').addEventListener('input', (e) => {
        updatePaymentSummary(e.target.value);
        // Убираем активный класс с быстрых кнопок при ручном вводе
        document.querySelectorAll('.quick-amount-btn').forEach(btn => {
            if (btn.dataset.amount !== e.target.value) {
                btn.classList.remove('active');
            }
        });
    });
    
    // Быстрые кнопки сумм
    document.querySelectorAll('.quick-amount-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = btn.dataset.amount;
            document.getElementById('amountInput').value = amount;
            updatePaymentSummary(amount);
            
            // Активируем выбранную кнопку
            document.querySelectorAll('.quick-amount-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Кнопка оплаты
    document.getElementById('confirmPaymentBtn').addEventListener('click', () => {
        const amount = parseInt(document.getElementById('amountInput').value);
        if (amount && amount >= 10) {
            createStarsInvoice(amount);
        }
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

// Сброс страницы пополнения баланса
function resetAddBalancePage() {
    document.getElementById('amountInput').value = '';
    document.querySelectorAll('.quick-amount-btn').forEach(btn => btn.classList.remove('active'));
    updatePaymentSummary(0);
}

// Обновление суммарной информации об оплате
function updatePaymentSummary(amount) {
    const parsedAmount = parseInt(amount) || 0;
    
    document.getElementById('summaryAmount').textContent = `${parsedAmount} ₽`;
    document.getElementById('summaryStars').textContent = `${parsedAmount} ⭐`;
    
    const payBtn = document.getElementById('confirmPaymentBtn');
    if (parsedAmount >= 10) {
        payBtn.disabled = false;
    } else {
        payBtn.disabled = true;
    }
}

// Функция для создания инвойса Telegram Stars
async function createStarsInvoice(amount) {
    const payBtn = document.getElementById('confirmPaymentBtn');
    const originalText = payBtn.textContent;
    
    try {
        // Показываем индикатор загрузки
        payBtn.disabled = true;
        payBtn.textContent = '⏳ Создание платежа...';
        
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
                    // Успешная оплата
                    tg.showAlert(`✅ Баланс успешно пополнен на ${amount} ₽!`);
                    updateUserBalance(amount);
                    resetAddBalancePage();
                    showPage('homePage');
                    
                    if (tg.HapticFeedback) {
                        tg.HapticFeedback.notificationOccurred('success');
                    }
                } else if (status === 'cancelled') {
                    tg.showAlert('❌ Оплата отменена');
                    payBtn.disabled = false;
                    payBtn.textContent = originalText;
                } else if (status === 'failed') {
                    tg.showAlert('❌ Ошибка оплаты. Попробуйте снова.');
                    payBtn.disabled = false;
                    payBtn.textContent = originalText;
                }
            });
        } else {
            tg.showAlert('❌ Ошибка создания платежа. Попробуйте позже.');
            payBtn.disabled = false;
            payBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Error creating invoice:', error);
        tg.showAlert('❌ Ошибка соединения с сервером');
        payBtn.disabled = false;
        payBtn.textContent = originalText;
    }
}

// Функция для обновления баланса пользователя после пополнения
function updateUserBalance(amount) {
    userBalance += amount;
    saveUserBalance();
    updateBalanceDisplay();
    console.log('✅ Balance updated:', userBalance, '₽');
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
