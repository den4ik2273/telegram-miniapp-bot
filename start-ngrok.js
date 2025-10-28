require('dotenv').config();
const ngrok = require('@ngrok/ngrok');
const { spawn } = require('child_process');
const fs = require('fs');

let botProcess = null;

async function startBot(tunnelUrl) {
    return new Promise((resolve) => {
        console.log('🤖 Запуск бота...');
        
        // Обновляем .env
        const envContent = `BOT_TOKEN=8342649818:AAGTTVuWqO-18EB8twuQvQFZ94LRQFbqCy8
MINIAPP_URL=${tunnelUrl}
PORT=3000
NGROK_AUTHTOKEN=34h1hFLJP85q9UGiQvj2gWhdzuu_4HRc671xWf5CPD9TE9kMZ`;
        
        fs.writeFileSync('.env', envContent, 'utf8');
        console.log('✅ Файл .env обновлен');
        
        // Запускаем бота
        botProcess = spawn('node', ['bot.js'], {
            stdio: 'inherit',
            shell: true
        });
        
        botProcess.on('error', (err) => {
            console.error('❌ Ошибка запуска бота:', err);
        });
        
        setTimeout(resolve, 2000);
    });
}

async function main() {
    try {
        console.log('🔄 Создание HTTPS туннеля через ngrok...\n');
        
        // Запускаем ngrok
        const listener = await ngrok.forward({ 
            addr: 3000,
            authtoken_from_env: true
        });
        
        const tunnelUrl = listener.url();
        
        console.log('✅ Туннель создан!');
        console.log('🌐 Публичный URL:', tunnelUrl);
        console.log('');
        
        await startBot(tunnelUrl);
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ ВСЕ ЗАПУЩЕНО!');
        console.log('='.repeat(60));
        console.log('');
        console.log('📱 Теперь настройте бота в @BotFather:');
        console.log('   1. Откройте @BotFather в Telegram');
        console.log('   2. Отправьте /mybots');
        console.log('   3. Выберите вашего бота');
        console.log('   4. Bot Settings → Menu Button');
        console.log('   5. Edit Menu Button URL');
        console.log('   6. Вставьте URL:', tunnelUrl);
        console.log('');
        console.log('🧪 Для тестирования:');
        console.log('   - Откройте бота в Telegram');
        console.log('   - Отправьте /start');
        console.log('   - Нажмите кнопку "Открыть Mini App"');
        console.log('');
        console.log('⚠️  Туннель работает, пока запущен этот скрипт');
        console.log('   Нажмите Ctrl+C для остановки');
        console.log('');
        
        // Держим процесс активным
        await new Promise(() => {});
        
    } catch (err) {
        console.error('\n❌ Ошибка:', err.message);
        
        if (err.message.includes('authtoken')) {
            console.log('\n📝 Похоже, ngrok не настроен. Выполните следующие шаги:\n');
            console.log('1. Зарегистрируйтесь: https://dashboard.ngrok.com/signup');
            console.log('2. Получите токен: https://dashboard.ngrok.com/get-started/your-authtoken');
            console.log('3. Установите токен:');
            console.log('   npx ngrok config add-authtoken ваш_токен\n');
            console.log('Подробная инструкция в файле NGROK_SETUP.md\n');
        }
        
        if (botProcess) {
            botProcess.kill();
        }
        process.exit(1);
    }
}

// Обработка остановки
process.on('SIGINT', () => {
    console.log('\n\n🛑 Остановка...');
    if (botProcess) {
        botProcess.kill();
    }
    process.exit();
});

main();

