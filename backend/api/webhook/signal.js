// backend/api/webhook/signal.js
import express from 'express';
import dotenv from 'dotenv';
import { sendToDiscord } from '../../services/discord.js';
import Signal from '../../models/signal.js';
import crypto from 'crypto';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const payload = req.body;
  console.log('📡 Webhook received:', payload);

  try {
    // ✅ Generate GPT explanation from signal
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            "You're ULTRA+, a sniper-grade trading AI developed by Jonomor. Explain why this signal was triggered or blocked in ONE short sentence.",
        },
        {
          role: 'user',
          content: `Explain this signal:\n${JSON.stringify(payload, null, 2)}`,
        },
      ],
    });

    const gptReply = gptResponse.choices?.[0]?.message?.content ?? '';

    const discordHash = crypto.createHash('md5').update(JSON.stringify(payload)).digest('hex').slice(0, 12);

    const newSignal = new Signal({
      type: payload.ai_signal,
      asset: payload.symbol,
      confidence: payload.confidence ?? null,
      timestamp: payload.time ? new Date(payload.time) : new Date(),
      discordHash,
      gptReply, // ✅ Auto-comment from GPT
    });

    await newSignal.save();

    // Optional: send to Discord
    if (process.env.DISCORD_WEBHOOK_URL) {
      await sendToDiscord(`🚀 Signal Received:\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\`\n🧠 **Reason:** ${gptReply}`);
    }

    return res.status(201).json({ success: true, id: newSignal._id, comment: gptReply });
  } catch (err) {
    console.error("❌ Failed to save or explain signal:", err.message);
    return res.status(500).json({ error: "Signal save failed" });
  }
});

export default router;
