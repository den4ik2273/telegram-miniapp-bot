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

// API endpoint для получения фото профиля пользователя
app.post('/api/get-user-photo', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.json({ success: false, error: 'No userId provided' });
    }
    
    // Получаем фотографии профиля пользователя
    const photos = await bot.getUserProfilePhotos(userId, { limit: 1 });
    
    if (photos.total_count > 0 && photos.photos.length > 0) {
      // Берем первое фото (самое актуальное)
      const photo = photos.photos[0];
      // Берем самое большое разрешение
      const largestPhoto = photo[photo.length - 1];
      
      // Получаем ссылку на файл
      const fileLink = await bot.getFileLink(largestPhoto.file_id);
      
      console.log(`📸 Got profile photo for user ${userId}: ${fileLink}`);
      
      res.json({
        success: true,
        photoUrl: fileLink
      });
    } else {
      // У пользователя нет фото профиля
      res.json({
        success: true,
        photoUrl: null
      });
    }
  } catch (error) {
    console.error('Error getting user photo:', error);
    res.json({ success: false, error: error.message });
  }
});

// API endpoint для создания инвойса Telegram Stars
app.post('/api/create-invoice', async (req, res) => {
  try {
    const { amount, userId } = req.body;
    
    if (!amount || amount < 10) {
      return res.json({ success: false, error: 'Invalid amount' });
    }
    
    // Создаем инвойс для Telegram Stars
    // 1 рубль = 1 звезда
    const starsAmount = amount;
    
    const invoice = await bot.createInvoiceLink(
      `Пополнение баланса на ${amount} ₽`, // title
      `Пополнение внутреннего баланса аккаунта`, // description
      `balance_${userId}_${Date.now()}`, // payload
      '', // provider_token (пустой для Stars)
      'XTR', // currency (XTR = Telegram Stars)
      [{ label: `${amount} ₽`, amount: starsAmount }] // prices
    );
    
    console.log(`💰 Created invoice for ${amount} stars (${amount} ₽) for user ${userId}`);
    
    res.json({
      success: true,
      invoiceLink: invoice
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.json({ success: false, error: error.message });
  }
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

// Обработчик успешной оплаты
bot.on('successful_payment', (msg) => {
  const chatId = msg.chat.id;
  const payment = msg.successful_payment;
  
  console.log('✅ Successful payment received:', payment);
  
  // Извлекаем сумму из invoice_payload
  const payload = payment.invoice_payload;
  const amount = parseInt(payment.total_amount);
  
  bot.sendMessage(chatId, `✅ Оплата успешно получена!\n\n💰 Ваш баланс пополнен на ${amount} ₽\n⭐ Списано звезд: ${amount}\n\nСпасибо за пополнение!`);
});

// Обработчик pre_checkout запроса (обязателен для оплаты)
bot.on('pre_checkout_query', (query) => {
  console.log('💳 Pre-checkout query received:', query);
  
  // Подтверждаем платеж
  bot.answerPreCheckoutQuery(query.id, true)
    .then(() => {
      console.log('✅ Pre-checkout query answered successfully');
    })
    .catch((error) => {
      console.error('❌ Error answering pre-checkout query:', error);
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

