# 🤖 Telegram Bot с Mini App

Полноценный пример Telegram бота с встроенным Mini App (веб-приложением).

## 📋 Описание

Этот проект демонстрирует, как создать Telegram бота с современным веб-интерфейсом (Mini App), который открывается прямо внутри Telegram.

### Возможности:

- ✅ Telegram бот с командами
- ✅ Красивый Mini App интерфейс
- ✅ Интеграция с Telegram Web App API
- ✅ Адаптивный дизайн
- ✅ Поддержка темной темы
- ✅ Отправка данных из приложения боту
- ✅ Haptic Feedback (вибрация)
- ✅ Всплывающие уведомления

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Создание бота в Telegram

1. Найдите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям и получите токен бота
4. Скопируйте токен

### 3. Настройка окружения

Отредактируйте файл `.env` и укажите токен бота:

```env
BOT_TOKEN=ваш_токен_от_BotFather
MINIAPP_URL=http://localhost:3000
PORT=3000
```

### 4. Запуск для локальной разработки

Для локальной разработки вам нужен публичный URL. Используйте **ngrok**:

#### Установка ngrok:

**Windows:**
```bash
# Скачайте с https://ngrok.com/download
# Или используйте chocolatey:
choco install ngrok
```

**macOS/Linux:**
```bash
brew install ngrok
```

#### Запуск ngrok:

```bash
# В первом терминале запустите бота:
npm start

# Во втором терминале запустите ngrok:
ngrok http 3000
```

После запуска ngrok скопируйте HTTPS URL (например, `https://abc123.ngrok.io`) и обновите файл `.env`:

```env
MINIAPP_URL=https://abc123.ngrok.io
```

Перезапустите бота.

### 5. Настройка Mini App в BotFather

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Нажмите **Bot Settings** → **Menu Button**
5. Нажмите **Edit Menu Button URL**
6. Введите URL вашего Mini App (ngrok URL)
7. Нажмите **Edit Menu Button Text** и введите текст кнопки (например, "Открыть App")

## 📱 Использование

### Команды бота:

- `/start` - Начать работу с ботом
- `/help` - Показать справку
- `/app` - Открыть Mini App

### Взаимодействие с Mini App:

1. Откройте бота в Telegram
2. Нажмите кнопку Menu или отправьте `/app`
3. Откроется веб-приложение с красивым интерфейсом
4. Все действия в приложении могут отправлять данные боту

## 🏗️ Структура проекта

```
telegram-miniapp-bot/
├── bot.js              # Основной файл бота
├── package.json        # Зависимости проекта
├── .env                # Конфигурация (не коммитится)
├── .gitignore          # Исключения для Git
├── README.md           # Документация
└── public/             # Frontend Mini App
    ├── index.html      # HTML страница
    ├── styles.css      # Стили
    └── app.js          # JavaScript логика
```

## 🛠️ Технологии

### Backend:
- **Node.js** - Серверная платформа
- **node-telegram-bot-api** - Библиотека для работы с Telegram Bot API
- **Express** - Веб-сервер для Mini App
- **dotenv** - Управление переменными окружения

### Frontend:
- **HTML5** - Разметка
- **CSS3** - Стилизация с градиентами и анимациями
- **JavaScript** - Логика приложения
- **Telegram Web App API** - Интеграция с Telegram

## 📝 Разработка

### Режим разработки с auto-reload:

```bash
npm run dev
```

### Добавление новых функций:

#### В бота (bot.js):

```javascript
// Добавьте новую команду
bot.onText(/\/mycommand/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Ответ на команду');
});
```

#### В Mini App (public/app.js):

```javascript
// Добавьте новый обработчик
document.getElementById('myButton').addEventListener('click', () => {
  tg.showAlert('Кнопка нажата!');
});
```

## 🌐 Деплой в продакшн

### Вариант 1: Heroku

```bash
heroku create
heroku config:set BOT_TOKEN=ваш_токен
heroku config:set MINIAPP_URL=https://ваше-приложение.herokuapp.com
git push heroku main
```

### Вариант 2: VPS (Ubuntu)

```bash
# На сервере:
git clone ваш-репозиторий
cd telegram-miniapp-bot
npm install
npm install -g pm2

# Создайте .env файл с настройками
nano .env

# Запустите с PM2
pm2 start bot.js --name telegram-bot
pm2 save
pm2 startup
```

### Вариант 3: Railway / Render

1. Подключите репозиторий
2. Укажите переменные окружения
3. Deploy автоматически

## 🔒 Безопасность

⚠️ **Важно:**

- Никогда не коммитьте файл `.env` с токенами
- Не публикуйте токен бота в открытом доступе
- Используйте HTTPS для продакшн окружения
- Валидируйте `initData` от Telegram на backend

### Валидация данных от Telegram:

```javascript
const crypto = require('crypto');

function validateTelegramWebAppData(initData) {
  // Реализуйте валидацию согласно документации Telegram
  // https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
}
```

## 📚 Полезные ссылки

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Web Apps Documentation](https://core.telegram.org/bots/webapps)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [Telegram Mini Apps Examples](https://github.com/Telegram-Mini-Apps)

## 🎨 Кастомизация

### Изменение цветовой схемы:

Отредактируйте `public/styles.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### Добавление новых страниц:

Создайте новые HTML файлы в `public/` и настройте маршруты в `bot.js`.

## 🐛 Отладка

### Проверка логов:

```bash
# При запуске через npm start
# Логи выводятся в консоль

# При запуске через PM2
pm2 logs telegram-bot
```

### Проверка работы бота:

1. Убедитесь, что токен бота правильный
2. Проверьте, что сервер запущен (`npm start`)
3. Проверьте доступность Mini App URL
4. Посмотрите консоль браузера в DevTools (F12)

## 💡 Советы

1. **Используйте ngrok** для локальной разработки
2. **Тестируйте** на разных платформах (iOS, Android, Desktop)
3. **Оптимизируйте** размер изображений и ресурсов
4. **Кешируйте** статические файлы
5. **Используйте** Telegram Web App API по максимуму

## 📄 Лицензия

ISC

## 🤝 Поддержка

Если возникли вопросы:

1. Проверьте документацию Telegram
2. Посмотрите issues в репозитории node-telegram-bot-api
3. Проверьте консоль на ошибки

---

**Создано с ❤️ для Telegram**

