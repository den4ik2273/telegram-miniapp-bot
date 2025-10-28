# 🚀 Деплой на Railway (БЕСПЛАТНО)

Railway предоставляет бесплатный хостинг для вашего Telegram бота с Mini App.

## 📝 Подготовка

### 1. Создайте GitHub аккаунт (если нет)
Перейдите на https://github.com и зарегистрируйтесь

### 2. Создайте новый репозиторий на GitHub
1. Откройте https://github.com/new
2. Название: `telegram-miniapp-bot`
3. Visibility: **Public** или **Private** (любой)
4. НЕ добавляйте README, .gitignore, license
5. Нажмите **Create repository**

### 3. Загрузите код в GitHub

Откройте PowerShell в папке проекта и выполните:

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/telegram-miniapp-bot.git
git push -u origin main
```

Замените `ВАШ_USERNAME` на ваше имя пользователя GitHub.

---

## 🚂 Деплой на Railway

### 1. Зарегистрируйтесь на Railway
1. Откройте https://railway.app/
2. Нажмите **Start a New Project**
3. Войдите через GitHub

### 2. Создайте новый проект
1. Нажмите **+ New Project**
2. Выберите **Deploy from GitHub repo**
3. Выберите репозиторий `telegram-miniapp-bot`
4. Нажмите **Deploy Now**

### 3. Настройте переменные окружения
1. Откройте ваш проект в Railway
2. Перейдите в **Variables**
3. Добавьте переменную:
   - **Key:** `BOT_TOKEN`
   - **Value:** `8342649818:AAGTTVuWqO-18EB8twuQvQFZ94LRQFbqCy8`

4. Railway автоматически создаст переменную `PORT` - оставьте её как есть

### 4. Включите публичный домен
1. В настройках проекта найдите **Settings**
2. Прокрутите до **Networking**
3. Нажмите **Generate Domain**
4. Скопируйте созданный URL (например: `your-app.up.railway.app`)

### 5. Добавьте MINIAPP_URL
1. Вернитесь в **Variables**
2. Добавьте ещё одну переменную:
   - **Key:** `MINIAPP_URL`
   - **Value:** `https://your-app.up.railway.app` (ваш Railway URL)

3. Проект автоматически перезапустится

---

## 🤖 Настройка BotFather

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Bot Settings → Menu Button → Edit Menu Button URL
5. Вставьте Railway URL: `https://your-app.up.railway.app`

---

## ✅ Готово!

Теперь ваш бот работает 24/7 на бесплатном хостинге Railway!

- Бот автоматически перезапускается при падении
- Работает стабильно
- Бесплатно до 500 часов в месяц (более чем достаточно)

### Проверка:
1. Откройте вашего бота в Telegram
2. Отправьте `/start`
3. Нажмите кнопку Mini App
4. Наслаждайтесь! 🎉

---

## 📊 Мониторинг

В панели Railway вы можете:
- Смотреть логи в реальном времени
- Перезапускать сервис
- Обновлять переменные окружения
- Смотреть статистику использования

---

## 🔄 Обновление кода

После внесения изменений в код:

```powershell
git add .
git commit -m "Описание изменений"
git push
```

Railway автоматически задеплоит новую версию!

