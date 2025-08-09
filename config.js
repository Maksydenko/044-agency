import TelegramBot from 'node-telegram-bot-api';
import { createClient } from '@supabase/supabase-js';

import 'dotenv/config';

export const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
