const BACK_URL = 'https://ping-admin.onrender.com';

const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;

const userFullName = [user.first_name, user.last_name]
  .filter(Boolean)
  .join(' ');
const username = userFullName || user.username;

document.getElementById('ping').addEventListener('click', async () => {
  await fetch(`${BACK_URL}/ping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username
    })
  });

  tg.close();
});
