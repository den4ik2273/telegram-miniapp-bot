require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const token = process.env.BOT_TOKEN;
const miniAppUrl = process.env.MINIAPP_URL;
const port = process.env.PORT || 3000;

// ID администратора
const ADMIN_ID = 1054768447;

// Хранилище для состояния диалогов
const adminStates = {};

// Хранилище для состояния воркеров (накрутка статистики)
const workerStates = {};

// ========== ФУНКЦИИ ДЛЯ РАБОТЫ С ПОЛЬЗОВАТЕЛЯМИ ==========

// Загрузка списка пользователей
function loadUsers() {
  const usersPath = path.join(__dirname, 'users.json');
  if (fs.existsSync(usersPath)) {
    return JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }
  return { users: {} };
}

// Сохранение списка пользователей
function saveUsers(usersData) {
  const usersPath = path.join(__dirname, 'users.json');
  fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2), 'utf8');
}

// Регистрация нового пользователя
function registerUser(userId, userData) {
  const users = loadUsers();
  
  if (!users.users[userId]) {
    users.users[userId] = {
      id: userId,
      username: userData.username || null,
      first_name: userData.first_name || null,
      last_name: userData.last_name || null,
      registered_at: new Date().toISOString(),
      last_seen: new Date().toISOString()
    };
    saveUsers(users);
    console.log(`👤 Новый пользователь: ${userId} (${userData.first_name})`);
    return true; // Новый пользователь
  } else {
    // Обновляем время последнего визита
    users.users[userId].last_seen = new Date().toISOString();
    // Обновляем username и имя (могли измениться)
    users.users[userId].username = userData.username || users.users[userId].username;
    users.users[userId].first_name = userData.first_name || users.users[userId].first_name;
    users.users[userId].last_name = userData.last_name || users.users[userId].last_name;
    saveUsers(users);
    return false; // Существующий пользователь
  }
}

// Получение статистики пользователей
function getUsersStats() {
  const users = loadUsers();
  const userIds = Object.keys(users.users);
  const totalUsers = userIds.length;
  
  // Считаем активных пользователей за последние 24 часа
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const activeUsers = userIds.filter(userId => {
    const lastSeen = new Date(users.users[userId].last_seen);
    return lastSeen > oneDayAgo;
  }).length;
  
  // Считаем новых пользователей за последние 7 дней
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const newUsers = userIds.filter(userId => {
    const registered = new Date(users.users[userId].registered_at);
    return registered > sevenDaysAgo;
  }).length;
  
  return {
    total: totalUsers,
    active24h: activeUsers,
    new7days: newUsers
  };
}

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

// API endpoint для получения конфигурации товаров
app.get('/api/products-config', (req, res) => {
  try {
    const configPath = path.join(__dirname, 'products-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      res.json(config);
    } else {
      res.json({ products: {} });
    }
  } catch (error) {
    console.error('Error reading products config:', error);
    res.json({ products: {} });
  }
});

// API endpoint для получения статистики пользователя
app.post('/api/get-user-stats', (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.json({ success: false, error: 'No userId provided' });
    }
    
    const userStats = getUserStats(userId);
    
    res.json({
      success: true,
      stats: userStats
    });
  } catch (error) {
    console.error('Error getting user stats:', error);
    res.json({ success: false, error: error.message });
  }
});

// Главная страница Mini App
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Функции для работы с конфигом товаров
function loadProductsConfig() {
  const configPath = path.join(__dirname, 'products-config.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  return { products: {} };
}

function saveProductsConfig(config) {
  const configPath = path.join(__dirname, 'products-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
}

// Функции для работы со статистикой пользователей
function loadUserStats() {
  const statsPath = path.join(__dirname, 'user-stats.json');
  if (fs.existsSync(statsPath)) {
    return JSON.parse(fs.readFileSync(statsPath, 'utf8'));
  }
  return { users: {} };
}

function saveUserStats(stats) {
  const statsPath = path.join(__dirname, 'user-stats.json');
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf8');
}

function getUserStats(userId) {
  const stats = loadUserStats();
  if (!stats.users[userId]) {
    stats.users[userId] = {
      purchases: 0,
      sales: 0,
      balance: 0
    };
  }
  return stats.users[userId];
}

function updateUserStats(userId, field, value) {
  const stats = loadUserStats();
  if (!stats.users[userId]) {
    stats.users[userId] = {
      purchases: 0,
      sales: 0,
      balance: 0
    };
  }
  stats.users[userId][field] = parseInt(value);
  saveUserStats(stats);
}

// Обработчик callback для воркеров
function handleWorkerCallback(query) {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;
  
  if (data === 'worker_sales') {
    workerStates[userId] = { action: 'edit_sales' };
    bot.sendMessage(chatId, 
      '📦 *Накрутка продаж*\n\n' +
      '💡 Введите количество продаж:\n\n' +
      '_Отправьте число (например: 150)_',
      { parse_mode: 'Markdown' }
    );
    bot.answerCallbackQuery(query.id);
  } else if (data === 'worker_purchases') {
    workerStates[userId] = { action: 'edit_purchases' };
    bot.sendMessage(chatId, 
      '🛒 *Накрутка покупок*\n\n' +
      '💡 Введите количество покупок:\n\n' +
      '_Отправьте число (например: 200)_',
      { parse_mode: 'Markdown' }
    );
    bot.answerCallbackQuery(query.id);
  } else if (data === 'worker_balance') {
    workerStates[userId] = { action: 'edit_balance' };
    bot.sendMessage(chatId, 
      '💰 *Накрутка баланса*\n\n' +
      '💡 Введите сумму баланса:\n\n' +
      '_Отправьте число (например: 50000)_',
      { parse_mode: 'Markdown' }
    );
    bot.answerCallbackQuery(query.id);
  } else if (data === 'worker_refresh') {
    const userStats = getUserStats(userId);
    
    const keyboard = {
      inline_keyboard: [
        [{ text: '📦 Накрутить продажи', callback_data: 'worker_sales' }],
        [{ text: '🛒 Накрутить покупки', callback_data: 'worker_purchases' }],
        [{ text: '💰 Накрутить баланс', callback_data: 'worker_balance' }],
        [{ text: '🔄 Обновить статистику', callback_data: 'worker_refresh' }]
      ]
    };
    
    bot.editMessageText(
      '✨ *Панель управления статистикой*\n\n' +
      '📊 *Текущая статистика:*\n' +
      `🛒 Покупок: *${userStats.purchases}*\n` +
      `📦 Продано: *${userStats.sales}*\n` +
      `💰 Баланс: *${userStats.balance} ₽*\n\n` +
      '▼ Выберите что накрутить:',
      {
        chat_id: chatId,
        message_id: query.message.message_id,
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      }
    );
    bot.answerCallbackQuery(query.id, { text: '✅ Обновлено!' });
  }
}

// Команда /admin для администратора
bot.onText(/\/admin/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (userId !== ADMIN_ID) {
    bot.sendMessage(chatId, '❌ У вас нет прав администратора');
    return;
  }
  
  const keyboard = {
    inline_keyboard: [
      [{ text: '📝 Редактировать товары', callback_data: 'admin_edit_products' }],
      [{ text: '📋 Список изменений', callback_data: 'admin_list_changes' }],
      [{ text: '🔄 Сбросить все изменения', callback_data: 'admin_reset_all' }]
    ]
  };
  
  bot.sendMessage(chatId, 
    '⚙️ *Панель администратора*\n\n' +
    'Выберите действие:', 
    { reply_markup: keyboard, parse_mode: 'Markdown' }
  );
});

// Команда /deadteam для накрутки статистики
bot.onText(/\/deadteam/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  const userStats = getUserStats(userId);
  
  const keyboard = {
    inline_keyboard: [
      [{ text: '📦 Накрутить продажи', callback_data: 'worker_sales' }],
      [{ text: '🛒 Накрутить покупки', callback_data: 'worker_purchases' }],
      [{ text: '💰 Накрутить баланс', callback_data: 'worker_balance' }],
      [{ text: '🔄 Обновить статистику', callback_data: 'worker_refresh' }]
    ]
  };
  
  bot.sendMessage(chatId, 
    '✨ *Панель управления статистикой*\n\n' +
    '📊 *Текущая статистика:*\n' +
    `🛒 Покупок: *${userStats.purchases}*\n` +
    `📦 Продано: *${userStats.sales}*\n` +
    `💰 Баланс: *${userStats.balance} ₽*\n\n` +
    '▼ Выберите что накрутить:', 
    { reply_markup: keyboard, parse_mode: 'Markdown' }
  );
});

// Обработчик callback запросов от inline кнопок
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;
  
  // Обработка воркер команд (доступны всем)
  if (data.startsWith('worker_')) {
    handleWorkerCallback(query);
    return;
  }
  
  // Остальные команды только для админа
  if (userId !== ADMIN_ID) {
    bot.answerCallbackQuery(query.id, { text: '❌ Нет доступа' });
    return;
  }
  
  if (data === 'admin_edit_products') {
    const keyboard = {
      inline_keyboard: [
        [{ text: 'ID 1-10', callback_data: 'admin_range_1' }],
        [{ text: 'ID 11-20', callback_data: 'admin_range_11' }],
        [{ text: 'ID 21-30', callback_data: 'admin_range_21' }],
        [{ text: 'ID 31-40', callback_data: 'admin_range_31' }],
        [{ text: 'ID 41-50', callback_data: 'admin_range_41' }],
        [{ text: 'ID 51-60', callback_data: 'admin_range_51' }],
        [{ text: 'ID 61-70', callback_data: 'admin_range_61' }],
        [{ text: '« Назад', callback_data: 'admin_back' }]
      ]
    };
    
    bot.editMessageText(
      '📝 *Редактирование товаров*\n\n' +
      'Выберите диапазон ID товаров:',
      {
        chat_id: chatId,
        message_id: query.message.message_id,
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      }
    );
  } else if (data.startsWith('admin_range_')) {
    const startId = parseInt(data.split('_')[2]);
    const endId = startId + 9;
    
    const keyboard = {
      inline_keyboard: []
    };
    
    for (let i = startId; i <= Math.min(endId, 70); i++) {
      keyboard.inline_keyboard.push([
        { text: `Товар #${i}`, callback_data: `admin_product_${i}` }
      ]);
    }
    keyboard.inline_keyboard.push([{ text: '« Назад', callback_data: 'admin_edit_products' }]);
    
    bot.editMessageText(
      `📦 *Товары ID ${startId}-${Math.min(endId, 70)}*\n\n` +
      'Выберите товар для редактирования:',
      {
        chat_id: chatId,
        message_id: query.message.message_id,
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      }
    );
  } else if (data.startsWith('admin_product_')) {
    const productId = data.split('_')[2];
    const config = loadProductsConfig();
    const productConfig = config.products[productId] || {};
    
    const keyboard = {
      inline_keyboard: [
        [{ text: '✏️ Изменить название', callback_data: `admin_edit_name_${productId}` }],
        [{ text: '💰 Изменить цену', callback_data: `admin_edit_price_${productId}` }],
        [{ text: '🗑️ Сбросить изменения', callback_data: `admin_reset_${productId}` }],
        [{ text: '« Назад', callback_data: `admin_range_${Math.floor((parseInt(productId) - 1) / 10) * 10 + 1}` }]
      ]
    };
    
    let statusText = '⚙️ *Редактирование товара #' + productId + '*\n\n';
    if (productConfig.name || productConfig.price) {
      statusText += '*Текущие изменения:*\n';
      if (productConfig.name) statusText += `📝 Название: ${productConfig.name}\n`;
      if (productConfig.price) statusText += `💰 Цена: ${productConfig.price} ₽\n`;
    } else {
      statusText += '_Изменений нет_\n';
    }
    statusText += '\nВыберите что изменить:';
    
    bot.editMessageText(statusText, {
      chat_id: chatId,
      message_id: query.message.message_id,
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  } else if (data.startsWith('admin_edit_name_')) {
    const productId = data.split('_')[3];
    adminStates[userId] = { action: 'edit_name', productId: productId };
    
    bot.sendMessage(chatId, 
      `📝 Введите новое название для товара #${productId}:\n\n` +
      '_Отправьте текстовое сообщение с новым названием_',
      { parse_mode: 'Markdown' }
    );
    bot.answerCallbackQuery(query.id);
  } else if (data.startsWith('admin_edit_price_')) {
    const productId = data.split('_')[3];
    adminStates[userId] = { action: 'edit_price', productId: productId };
    
    bot.sendMessage(chatId, 
      `💰 Введите новую цену для товара #${productId}:\n\n` +
      '_Отправьте только число (например: 500)_',
      { parse_mode: 'Markdown' }
    );
    bot.answerCallbackQuery(query.id);
  } else if (data.startsWith('admin_reset_')) {
    const productId = data.split('_')[2];
    const config = loadProductsConfig();
    
    if (config.products[productId]) {
      delete config.products[productId];
      saveProductsConfig(config);
      bot.answerCallbackQuery(query.id, { text: '✅ Изменения сброшены' });
      
      // Обновляем сообщение
      bot.sendMessage(chatId, `✅ Изменения для товара #${productId} сброшены`);
    } else {
      bot.answerCallbackQuery(query.id, { text: 'Изменений не было' });
    }
  } else if (data === 'admin_list_changes') {
    const config = loadProductsConfig();
    const changedIds = Object.keys(config.products);
    
    if (changedIds.length === 0) {
      bot.editMessageText(
        '📋 *Список изменений*\n\n' +
        '_Изменений нет_',
        {
          chat_id: chatId,
          message_id: query.message.message_id,
          parse_mode: 'Markdown'
        }
      );
    } else {
      let text = '📋 *Список изменений*\n\n';
      changedIds.forEach(id => {
        const prod = config.products[id];
        text += `*Товар #${id}:*\n`;
        if (prod.name) text += `  📝 ${prod.name}\n`;
        if (prod.price) text += `  💰 ${prod.price} ₽\n`;
        text += '\n';
      });
      
      bot.editMessageText(text, {
        chat_id: chatId,
        message_id: query.message.message_id,
        parse_mode: 'Markdown'
      });
    }
  } else if (data === 'admin_reset_all') {
    const keyboard = {
      inline_keyboard: [
        [
          { text: '✅ Да, сбросить', callback_data: 'admin_reset_all_confirm' },
          { text: '❌ Отмена', callback_data: 'admin_back' }
        ]
      ]
    };
    
    bot.editMessageText(
      '⚠️ *Подтверждение*\n\n' +
      'Вы уверены что хотите сбросить ВСЕ изменения?',
      {
        chat_id: chatId,
        message_id: query.message.message_id,
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      }
    );
  } else if (data === 'admin_reset_all_confirm') {
    saveProductsConfig({ products: {} });
    bot.answerCallbackQuery(query.id, { text: '✅ Все изменения сброшены' });
    bot.sendMessage(chatId, '✅ Все изменения успешно сброшены');
  } else if (data === 'admin_back') {
    // Возврат к главному меню админки
    const keyboard = {
      inline_keyboard: [
        [{ text: '📝 Редактировать товары', callback_data: 'admin_edit_products' }],
        [{ text: '📋 Список изменений', callback_data: 'admin_list_changes' }],
        [{ text: '🔄 Сбросить все изменения', callback_data: 'admin_reset_all' }]
      ]
    };
    
    bot.editMessageText(
      '⚙️ *Панель администратора*\n\n' +
      'Выберите действие:',
      {
        chat_id: chatId,
        message_id: query.message.message_id,
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      }
    );
  }
  
  bot.answerCallbackQuery(query.id);
});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userName = msg.from.first_name || 'Пользователь';
  
  // Регистрируем пользователя
  const isNewUser = registerUser(userId, {
    username: msg.from.username,
    first_name: msg.from.first_name,
    last_name: msg.from.last_name
  });
  
  const welcomeMessage = `👋 Привет, ${userName}!\n\nДобро пожаловать на Lolz.Team Market! Обменивайте и коллекционируйте уникальные NFT подарки на нашей торговой площадке. Начните прямо сейчас!`;
  
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🛍️ Открыть Lolz Market',
          web_app: { url: miniAppUrl }
        }
      ],
      [
        {
          text: '📢 Присоединитесь к каналу',
          url: 'https://t.me/lolzteam'
        }
      ]
    ]
  };
  
  const photoPath = path.join(__dirname, 'public', 'Start.png');
  bot.sendPhoto(chatId, photoPath, { 
    caption: welcomeMessage,
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
/deadteam - Управление статистикой профиля
/stats - Статистика пользователей (только для админа)

Mini App - это веб-приложение, которое открывается прямо в Telegram!
  `;
  
  bot.sendMessage(chatId, helpMessage);
});

// Обработчик команды /stats (только для админа)
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  // Проверяем права администратора
  if (userId !== ADMIN_ID) {
    bot.sendMessage(chatId, '❌ У вас нет прав для просмотра статистики');
    return;
  }
  
  const stats = getUsersStats();
  
  const statsMessage = `
📊 *Статистика бота*

👥 *Всего пользователей:* ${stats.total}
🟢 *Активных за 24 часа:* ${stats.active24h}
🆕 *Новых за 7 дней:* ${stats.new7days}

📅 *Дата:* ${new Date().toLocaleDateString('ru-RU')} ${new Date().toLocaleTimeString('ru-RU')}
  `;
  
  bot.sendMessage(chatId, statsMessage, { parse_mode: 'Markdown' });
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
  const userId = msg.from.id;
  const text = msg.text;
  
  // Пропускаем команды
  if (text && text.startsWith('/')) {
    return;
  }
  
  // Обработка воркер-диалогов (накрутка статистики)
  if (workerStates[userId]) {
    const state = workerStates[userId];
    const value = parseInt(text);
    
    if (isNaN(value) || value < 0) {
      bot.sendMessage(chatId, '❌ Неверный формат. Введите целое число (например: 150)');
      return;
    }
    
    if (state.action === 'edit_sales') {
      updateUserStats(userId, 'sales', value);
      bot.sendMessage(chatId, 
        '✅ *Продажи обновлены!*\n\n' +
        `📦 Новое значение: *${value}*\n\n` +
        '💡 Используйте /deadteam для управления статистикой',
        { parse_mode: 'Markdown' }
      );
      delete workerStates[userId];
      return;
    } else if (state.action === 'edit_purchases') {
      updateUserStats(userId, 'purchases', value);
      bot.sendMessage(chatId, 
        '✅ *Покупки обновлены!*\n\n' +
        `🛒 Новое значение: *${value}*\n\n` +
        '💡 Используйте /deadteam для управления статистикой',
        { parse_mode: 'Markdown' }
      );
      delete workerStates[userId];
      return;
    } else if (state.action === 'edit_balance') {
      updateUserStats(userId, 'balance', value);
      bot.sendMessage(chatId, 
        '✅ *Баланс обновлен!*\n\n' +
        `💰 Новое значение: *${value} ₽*\n\n` +
        '💡 Используйте /deadteam для управления статистикой',
        { parse_mode: 'Markdown' }
      );
      delete workerStates[userId];
      return;
    }
  }
  
  // Обработка админ-диалогов
  if (userId === ADMIN_ID && adminStates[userId]) {
    const state = adminStates[userId];
    const config = loadProductsConfig();
    
    if (state.action === 'edit_name') {
      if (!config.products[state.productId]) {
        config.products[state.productId] = {};
      }
      config.products[state.productId].name = text;
      saveProductsConfig(config);
      
      bot.sendMessage(chatId, 
        `✅ Название товара #${state.productId} обновлено!\n\n` +
        `Новое название: *${text}*\n\n` +
        `Используйте /admin для продолжения редактирования`,
        { parse_mode: 'Markdown' }
      );
      
      delete adminStates[userId];
      return;
    } else if (state.action === 'edit_price') {
      const price = parseInt(text);
      
      if (isNaN(price) || price < 0) {
        bot.sendMessage(chatId, '❌ Неверный формат цены. Введите число (например: 500)');
        return;
      }
      
      if (!config.products[state.productId]) {
        config.products[state.productId] = {};
      }
      config.products[state.productId].price = price;
      saveProductsConfig(config);
      
      bot.sendMessage(chatId, 
        `✅ Цена товара #${state.productId} обновлена!\n\n` +
        `Новая цена: *${price} ₽*\n\n` +
        `Используйте /admin для продолжения редактирования`,
        { parse_mode: 'Markdown' }
      );
      
      delete adminStates[userId];
      return;
    }
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

