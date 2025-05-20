require('dotenv').config();
console.log('Loaded PORT:', JSON.stringify(process.env.PORT));
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Support form route
app.post('/api/support', async (req, res) => {
  const { email, message, note } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, error: 'Email and message are required' });
  }

  console.log('--- New Support Request ---');
  console.log('Email:', email);
  console.log('Message:', message);
  console.log('Additional Note:', note || 'None');

  const telegramMessage = `
New Support Request:

Email: ${email}
Message: ${message}
Note: ${note || 'None'}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,{
      chat_id: process.env.TELEGRAM_USER_ID,
      text: telegramMessage,
    });
    console.log('Telegram notification sent.');
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to send Telegram message:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send Telegram message' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);});