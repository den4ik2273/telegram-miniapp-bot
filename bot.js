require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const path = require('path');

const token = process.env.BOT_TOKEN;
const miniAppUrl = process.env.MINIAPP_URL;
const port = process.env.PORT || 3000;

console.log('🔧 Переменные окружения:');
console.log('  BOT_TOKEN:', token ? '✓ установлен' : '✗ НЕ установлен');
console.log('  MINIAPP_URL:', miniAppUrl);
console.log('  PORT:', port);

// Создаем бота
const bot = new TelegramBot(token, { polling: true });

// Создаем Express сервер для Mini App
const app = express();
app.use(cors());
app.use(express.json());

// Логируем все входящие запросы
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

app.use(express.static('public'));

// API endpoint для получения данных пользователя
app.post('/api/user-data', (req, res) => {
  const { initData } = req.body;
  
  // Здесь можно валидировать initData
  // и работать с данными пользователя
  
  res.json({
    success: true,
    message: 'Данные получены'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Главная страница Mini App
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'Пользователь';
  
  const welcomeMessage = `👋 Привет, ${userName}!\n\nДобро пожаловать в бота с Mini App.\nНажмите кнопку ниже, чтобы открыть приложение.`;
  
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🚀 Открыть Mini App',
          web_app: { url: miniAppUrl }
        }
      ]
    ]
  };
  
  bot.sendMessage(chatId, welcomeMessage, {
    reply_markup: keyboard
  });
});

// Обработчик команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  const helpMessage = `
📖 Справка по боту:

/start - Начать работу
/help - Показать это сообщение
/app - Открыть Mini App

Mini App - это веб-приложение, которое открывается прямо в Telegram!
  `;
  
  bot.sendMessage(chatId, helpMessage);
});

// Обработчик команды /app
bot.onText(/\/app/, (msg) => {
  const chatId = msg.chat.id;
  
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🚀 Открыть Mini App',
          web_app: { url: miniAppUrl }
        }
      ]
    ]
  };
  
  bot.sendMessage(chatId, 'Нажмите кнопку для открытия приложения:', {
    reply_markup: keyboard
  });
});

// Обработчик всех остальных сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  // Пропускаем команды
  if (text && text.startsWith('/')) {
    return;
  }
  
  // Отвечаем на обычные сообщения
  if (text) {
    bot.sendMessage(chatId, `Вы написали: ${text}\n\nИспользуйте /help для списка команд.`);
  }
});

// Запускаем Express сервер
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Сервер запущен на порту ${port}`);
  console.log(`🌐 Mini App доступен по адресу: ${miniAppUrl}`);
  console.log(`🤖 Бот запущен и ожидает сообщений...`);
});

// Обработка ошибок
bot.on('polling_error', (error) => {
  console.error('Ошибка polling:', error);
});

