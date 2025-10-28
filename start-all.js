const localtunnel = require('localtunnel');
const { spawn } = require('child_process');
const fs = require('fs');

let botProcess = null;

async function startBot(tunnelUrl) {
    return new Promise((resolve) => {
        console.log('🤖 Запуск бота...');
        
        // Обновляем .env
        const envContent = `BOT_TOKEN=8342649818:AAGTTVuWqO-18EB8twuQvQFZ94LRQFbqCy8
MINIAPP_URL=${tunnelUrl}
PORT=3000`;
        
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
        console.log('🔄 Создание HTTPS туннеля...\n');
        
        const tunnel = await localtunnel({ 
            port: 3000,
            subdomain: 'lolzteam-' + Math.random().toString(36).substring(7)
        });
        
        const tunnelUrl = tunnel.url;
        
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
        
        tunnel.on('close', () => {
            console.log('\n❌ Туннель закрыт');
            if (botProcess) {
                botProcess.kill();
            }
            process.exit();
        });
        
    } catch (err) {
        console.error('❌ Ошибка:', err.message);
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

