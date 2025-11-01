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
let currentFilter = 'random'; // Фильтр по умолчанию

// Products массив загружается из gifts-data.js

// Инициализация
async function init() {
    loadUserBalance();
    await loadAdminConfig(); // Загружаем изменения админа
    await loadUserStats(); // Загружаем статистику пользователя
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

// Функция для загрузки конфигурации администратора
async function loadAdminConfig() {
    try {
        const response = await fetch('/api/products-config');
        const config = await response.json();
        
        if (config.products && Object.keys(config.products).length > 0) {
            // Применяем изменения к товарам
            Object.keys(config.products).forEach(productId => {
                const changes = config.products[productId];
                const product = products.find(p => p.id === parseInt(productId));
                
                if (product) {
                    if (changes.name) product.name = changes.name;
                    if (changes.price) product.price = changes.price;
                }
            });
            
            console.log('✅ Admin config applied:', config);
        }
    } catch (error) {
        console.error('Error loading admin config:', error);
    }
}

// Функция для загрузки статистики пользователя
async function loadUserStats() {
    if (!user || !user.id) return;
    
    try {
        const response = await fetch('/api/get-user-stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user.id })
        });
        
        const data = await response.json();
        
        if (data.success && data.stats) {
            updateStatsDisplay(data.stats);
            console.log('📊 User stats loaded:', data.stats);
        }
    } catch (error) {
        console.error('Error loading user stats:', error);
    }
}

// Функция для обновления отображения статистики
function updateStatsDisplay(stats) {
    const purchasesElement = document.getElementById('userPurchases');
    const salesElement = document.getElementById('userSales');
    const balanceProfileElement = document.getElementById('userBalanceProfile');
    
    if (purchasesElement) {
        purchasesElement.textContent = stats.purchases || 0;
    }
    
    if (salesElement) {
        salesElement.textContent = stats.sales || 0;
    }
    
    if (balanceProfileElement) {
        balanceProfileElement.textContent = `${stats.balance || 0} ₽`;
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
    let filteredProducts = category === 'all' 
        ? [...products] 
        : products.filter(p => p.category === category);
    
    // Применяем сортировку
    if (currentFilter === 'cheap') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentFilter === 'expensive') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (currentFilter === 'random') {
        // Рандомная сортировка
        filteredProducts.sort(() => Math.random() - 0.5);
    }
    
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
    
    // Обновляем статистику при открытии профиля
    if (pageId === 'profilePage') {
        loadUserStats();
    }
    
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
            tg.showAlert('❌ Недостаточно средств');
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
    
    // Кнопка "Как добавить подарок?"
    document.getElementById('howToAddGiftBtn').addEventListener('click', () => {
        openGiftModal();
        
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    });
    
    // Кнопка FAQ
    document.getElementById('faqBtn').addEventListener('click', () => {
        openFaqModal();
        
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    });
    
    // Закрытие FAQ модального окна
    document.getElementById('closeFaqModal').addEventListener('click', () => {
        closeFaqModal();
    });
    
    // Закрытие FAQ по клику на overlay
    document.getElementById('faqModalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'faqModalOverlay') {
            closeFaqModal();
        }
    });
    
    // Закрытие модального окна
    document.getElementById('closeGiftModal').addEventListener('click', () => {
        closeGiftModal();
    });
    
    // Закрытие по клику на overlay
    document.getElementById('giftModalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'giftModalOverlay') {
            closeGiftModal();
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
    
    // Фильтр товаров
    const filterBtn = document.getElementById('filterBtn');
    const filterDropdown = document.getElementById('filterDropdown');
    const filterText = document.getElementById('filterText');
    
    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filterBtn.classList.toggle('active');
        filterDropdown.classList.toggle('show');
        
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    });
    
    // Закрытие dropdown при клике вне его
    document.addEventListener('click', (e) => {
        if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterBtn.classList.remove('active');
            filterDropdown.classList.remove('show');
        }
    });
    
    // Опции фильтра
    document.querySelectorAll('.filter-option').forEach(option => {
        // Устанавливаем active для режима по умолчанию
        if (option.dataset.filter === 'random') {
            option.classList.add('active');
        }
        
        option.addEventListener('click', () => {
            const filter = option.dataset.filter;
            currentFilter = filter;
            
            // Обновляем текст кнопки
            const filterNames = {
                'random': 'Рандомные',
                'cheap': 'Самые дешевые',
                'expensive': 'Самые дорогие'
            };
            filterText.textContent = filterNames[filter];
            
            // Обновляем активную опцию
            document.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Закрываем dropdown
            filterBtn.classList.remove('active');
            filterDropdown.classList.remove('show');
            
            // Перерисовываем товары
            renderProducts();
            
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('medium');
            }
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
    document.getElementById('summaryStars').innerHTML = `${parsedAmount} <img src="star.png" alt="Star" class="star-icon-inline">`;
    
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

// Функция для открытия модального окна с инструкцией
function openGiftModal() {
    const modal = document.getElementById('giftModalOverlay');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Функция для закрытия модального окна
function closeGiftModal() {
    const modal = document.getElementById('giftModalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Функция для открытия FAQ модального окна
function openFaqModal() {
    const modal = document.getElementById('faqModalOverlay');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

// Функция для закрытия FAQ модального окна
function closeFaqModal() {
    const modal = document.getElementById('faqModalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
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
