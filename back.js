import cors from 'cors';
import express from 'express';

import { startBot } from './bot.js';
import { bot, supabase } from './config.js';
import { ROLES, SUPABASE_TABLES } from './consts.js';

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URL,
  })
);
app.use(express.json());

startBot();

app.post('/ping', async (req, res) => {
  const { data: adminsData, error } = await supabase
    .from(SUPABASE_TABLES.USERS)
    .select('id')
    .eq('role', ROLES.ADMINISTRATOR);

  if (error) {
    res.status(500).json({
      error: error.message
    });

    return;
  }

  for (const admin of adminsData) {
    await bot.sendMessage(
      admin.id,
      `User ${req.body.username} pressed the button`
    );
  }

  res.status(200).json({
    status: 'ok'
  });
});

app.listen(process.env.BACK_PORT);
