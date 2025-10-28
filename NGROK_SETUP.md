# 🔧 Настройка ngrok

## Шаг 1: Получите бесплатный токен

1. Откройте https://dashboard.ngrok.com/signup
2. Зарегистрируйтесь (можно через GitHub/Google)
3. После входа вы увидите ваш authtoken на странице: https://dashboard.ngrok.com/get-started/your-authtoken
4. Скопируйте токен (выглядит как: `2abc123def456ghi789jkl0mnop1qrs_2stuVwxYzAbCdEfGhIjK`)

## Шаг 2: Установите токен

Выполните в PowerShell:
```powershell
ngrok config add-authtoken ваш_токен_здесь
```

## Шаг 3: Готово!

Теперь можете использовать скрипт с ngrok.

