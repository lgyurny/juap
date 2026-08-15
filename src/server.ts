import express from 'express';
import { Bot, InlineKeyboard } from 'grammy';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer(botToken?: string, webAppUrl?: string) {
  const app = express();
  app.use(express.json());

  // Serve static dist folder if built
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Setup Telegram Bot if token provided
  let bot: Bot | null = null;
  if (botToken) {
    bot = new Bot(botToken);

    bot.command('start', async (ctx) => {
      const url = webAppUrl || `http://localhost:${process.env.PORT || 3000}`;
      const keyboard = new InlineKeyboard().webApp('Open Mini App 🚀', url);

      await ctx.reply('Welcome to Telegram Mini App! Click below to open the application:', {
        reply_markup: keyboard,
      });
    });
  }

  return { app, bot };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 3000;
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const WEB_APP_URL = process.env.WEB_APP_URL;

  const { app, bot } = createServer(BOT_TOKEN, WEB_APP_URL);

  if (bot) {
    bot.start();
    console.log('Telegram Bot started running via long polling.');
  } else {
    console.log('No BOT_TOKEN provided; running web server only.');
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
