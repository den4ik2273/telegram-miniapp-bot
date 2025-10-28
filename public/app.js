// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Расширяем приложение на весь экран
tg.expand();

// Включаем главную кнопку
tg.MainButton.text = "Закрыть приложение";
tg.MainButton.show();

// Обработчик главной кнопки
tg.MainButton.onClick(() => {
    tg.close();
});

// Получаем данные пользователя
const user = tg.initDataUnsafe?.user;

// Функция для отображения информации о пользователе
function displayUserInfo() {
    const userNameElement = document.getElementById('userName');
    const userIdElement = document.getElementById('userId');
    const avatarElement = document.getElementById('avatar');

    if (user) {
        const firstName = user.first_name || 'Пользователь';
        const lastName = user.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim();
        
        userNameElement.textContent = fullName;
        userIdElement.textContent = `ID: ${user.id}`;
        
        // Показываем первую букву имени как аватар
        if (user.first_name) {
            avatarElement.textContent = user.first_name[0].toUpperCase();
        }
    } else {
        userNameElement.textContent = 'Гость';
        userIdElement.textContent = 'Режим предварительного просмотра';
    }
}

// Функция для отображения информации о Web App
function displayWebAppInfo() {
    document.getElementById('version').textContent = tg.version || 'N/A';
    document.getElementById('platform').textContent = tg.platform || 'unknown';
    document.getElementById('colorScheme').textContent = tg.colorScheme || 'light';
}

// Применяем цветовую схему Telegram
function applyTheme() {
    const root = document.documentElement;
    
    if (tg.themeParams) {
        if (tg.themeParams.bg_color) {
            root.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color);
        }
        if (tg.themeParams.text_color) {
            root.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color);
        }
        if (tg.themeParams.hint_color) {
            root.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color);
        }
        if (tg.themeParams.button_color) {
            root.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color);
            root.style.setProperty('--primary-color', tg.themeParams.button_color);
        }
        if (tg.themeParams.button_text_color) {
            root.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color);
        }
        if (tg.themeParams.secondary_bg_color) {
            root.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color);
        }
    }
}

// Обработчики кнопок действий
document.getElementById('actionBtn1').addEventListener('click', () => {
    tg.showAlert('Вы нажали на Действие 1! 🎯');
    
    // Отправляем данные боту
    tg.sendData(JSON.stringify({
        action: 'action1',
        userId: user?.id,
        timestamp: Date.now()
    }));
});

document.getElementById('actionBtn2').addEventListener('click', () => {
    tg.showConfirm('Вы уверены, что хотите выполнить Действие 2?', (confirmed) => {
        if (confirmed) {
            tg.showAlert('Действие 2 выполнено! 🎨');
        }
    });
});

document.getElementById('actionBtn3').addEventListener('click', () => {
    // Показываем popup
    tg.showPopup({
        title: 'Действие 3',
        message: 'Это всплывающее окно Telegram Web App!',
        buttons: [
            { id: 'ok', type: 'ok' },
            { id: 'cancel', type: 'cancel' }
        ]
    }, (buttonId) => {
        if (buttonId === 'ok') {
            tg.showAlert('Успешно! ✨');
        }
    });
});

// Обработчик кнопки отправки обратной связи
document.getElementById('sendBtn').addEventListener('click', () => {
    const feedbackText = document.getElementById('feedbackInput').value.trim();
    
    if (!feedbackText) {
        tg.showAlert('Пожалуйста, введите сообщение');
        return;
    }
    
    // Отправляем данные боту
    tg.sendData(JSON.stringify({
        type: 'feedback',
        message: feedbackText,
        userId: user?.id,
        timestamp: Date.now()
    }));
    
    tg.showAlert('Сообщение отправлено! 💬');
    document.getElementById('feedbackInput').value = '';
});

// Обработка события отправки данных
tg.onEvent('mainButtonClicked', () => {
    console.log('Main button clicked');
});

// Уведомляем Telegram, что приложение готово
tg.ready();

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    displayUserInfo();
    displayWebAppInfo();
    applyTheme();
    
    console.log('Telegram Web App initialized');
    console.log('User:', user);
    console.log('Init Data:', tg.initDataUnsafe);
});

// Обработка изменения темы
tg.onEvent('themeChanged', () => {
    console.log('Theme changed');
    applyTheme();
});

// Функция для отправки запроса на сервер
async function sendToServer(data) {
    try {
        const response = await fetch('/api/user-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                initData: tg.initData,
                data: data
            })
        });
        
        const result = await response.json();
        console.log('Server response:', result);
        return result;
    } catch (error) {
        console.error('Error sending to server:', error);
        tg.showAlert('Ошибка отправки данных на сервер');
    }
}

// Добавляем вибрацию при нажатии на кнопки (если доступна)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('medium');
        }
    });
});

