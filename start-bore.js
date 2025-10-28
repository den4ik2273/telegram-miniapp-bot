require('dotenv').config();
const { spawn } = require('child_process');
const fs = require('fs');

let botProcess = null;
let boreProcess = null;

function startBore() {
    return new Promise((resolve, reject) => {
        console.log('🔄 Создание HTTPS туннеля через bore.pub...\n');
        
        boreProcess = spawn('.\\bore.exe', ['local', '3000', '--to', 'bore.pub'], {
            shell: true
        });
        
        let tunnelUrl = '';
        
        boreProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(output);
            
            // Ищем URL в выводе: bore.pub:PORT или listening at bore.pub:PORT
            const portMatch = output.match(/bore\.pub:(\d+)/);
            if (portMatch && !tunnelUrl) {
                const port = portMatch[1];
                tunnelUrl = `https://bore.pub:${port}`;
                resolve(tunnelUrl);
            }
        });
        
        boreProcess.stderr.on('data', (data) => {
            const output = data.toString();
            console.log(output);
            
            const portMatch = output.match(/bore\.pub:(\d+)/);
            if (portMatch && !tunnelUrl) {
                const port = portMatch[1];
                tunnelUrl = `https://bore.pub:${port}`;
                resolve(tunnelUrl);
            }
        });
        
        boreProcess.on('error', (err) => {
            reject(err);
        });
        
        // Таймаут
        setTimeout(() => {
            if (!tunnelUrl) {
                reject(new Error('Не удалось получить URL туннеля за 20 секунд'));
            }
        }, 20000);
    });
}

async function main() {
    try {
        // Сначала запускаем веб-сервер
        console.log('🤖 Запуск веб-сервера...\n');
        
        botProcess = spawn('node', ['bot.js'], {
            stdio: 'inherit',
            shell: true,
            env: { ...process.env, MINIAPP_URL: 'http://localhost:3000' }
        });
        
        botProcess.on('error', (err) => {
            console.error('❌ Ошибка запуска бота:', err);
        });
        
        // Даем серверу время запуститься
        console.log('⏳ Ожидание запуска сервера...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log('✅ Сервер запущен на порту 3000\n');
        
        // Теперь запускаем туннель
        const tunnelUrl = await startBore();
        
        console.log('\n✅ Туннель создан!');
        console.log('🌐 Публичный URL:', tunnelUrl);
        console.log('');
        
        // Обновляем .env
        const envContent = `BOT_TOKEN=8342649818:AAGTTVuWqO-18EB8twuQvQFZ94LRQFbqCy8
MINIAPP_URL=${tunnelUrl}
PORT=3000
NGROK_AUTHTOKEN=34h1hFLJP85q9UGiQvj2gWhdzuu_4HRc671xWf5CPD9TE9kMZ`;
        
        fs.writeFileSync('.env', envContent, 'utf8');
        console.log('✅ Файл .env обновлен с новым URL');
        
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
        
        if (boreProcess) {
            boreProcess.kill();
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
    if (boreProcess) {
        boreProcess.kill();
    }
    if (botProcess) {
        botProcess.kill();
    }
    process.exit();
});

main();

