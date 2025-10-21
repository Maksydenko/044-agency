import { bot, supabase } from './config.js';
import { ROLES, SUPABASE_TABLES } from './enums.js';

export const startBot = () => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    const { data: user } = await supabase
      .from(SUPABASE_TABLES.USERS)
      .select('*')
      .eq('id', chatId)
      .single();

    if (!user) {
      await supabase.from(SUPABASE_TABLES.USERS).insert([
        {
          id: chatId,
          role: ROLES.CLIENT,
          username: msg.from.username
        }
      ]);
    }

    bot.sendMessage(chatId, 'Ping Admin', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Ping',
              web_app: {
                url: process.env.FRONT_URL
              }
            }
          ]
        ]
      }
    });
  });
};
