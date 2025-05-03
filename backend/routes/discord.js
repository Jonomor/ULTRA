import express from "express";
import { requireAdmin } from "../middleware/auth.js";
import fetch from "node-fetch";

const router = express.Router();

router.post("/broadcast", requireAdmin, async (req, res) => {
  const { message } = req.body;
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📡 ULTRA PRO+ Alert:\n${message}`,
      }),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Discord webhook failed", err);
    res.status(500).json({ error: "Failed to send to Discord" });
  }
});

export default router;
