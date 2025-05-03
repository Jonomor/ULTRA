// backend/api/signals/signal.js
import express from 'express';
import { sendToDiscord } from '../../services/discord.js'; // optional
const router = express.Router();

router.post('/', async (req, res) => {
  const payload = req.body;

  console.log('📡 Webhook received:', payload);

  // Optionally broadcast to Discord
  if (process.env.DISCORD_WEBHOOK_URL) {
    await sendToDiscord(`🚀 Signal Received:\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``);
  }

  return res.status(200).json({ success: true });
});

export default router;
