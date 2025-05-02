// backend/api/discord/broadcast.js
import express from "express";
import crypto from "crypto";
import { requireAdmin } from "../../middleware/auth.js";
import fetch from "node-fetch";

const router = express.Router();

router.post("/broadcast", requireAdmin, async (req, res) => {
  const { symbol, ai_signal, time } = req.body;

  const payload = { symbol, ai_signal, time };
  const hash = crypto.createHash("md5").update(JSON.stringify(payload)).digest("hex").slice(0, 12);

  const discordBody = {
    content: `📈 **${symbol}** – ${ai_signal} @ ${time}\n🔐 Ref: \`${hash}\``,
  };

  try {
    const discordRes = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordBody),
    });

    if (!discordRes.ok) throw new Error("Discord failed");

    res.json({ success: true, hash });
  } catch (err) {
    console.error("Discord Broadcast Error:", err);
    res.status(500).json({ error: "Broadcast failed" });
  }
});

export default router;
