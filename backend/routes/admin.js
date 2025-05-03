import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { requireAdmin } from "../middleware/auth.js"; // ✅ FIXED
import Signal from "../models/signal.js";
import AdminConfig from "../models/config.js";
import admin from "firebase-admin";
import adminController from "../controllers/adminController.js"; // ✅ default export from controller

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let DISPATCH_STATE = false;
let REGIME_MODE = "auto";

// ✅ Load admin config state
AdminConfig.findOne().then((doc) => {
  if (doc) {
    DISPATCH_STATE = doc.dispatchEnabled;
    REGIME_MODE = doc.regimeMode;
    console.log("🧠 Admin config loaded");
  } else {
    new AdminConfig().save();
    console.log("⚙️ Default admin config created");
  }
});

// ✅ Signal logs
router.get("/signals", requireAdmin, async (req, res) => {
  try {
    const signals = await Signal.find().sort({ timestamp: -1 }).limit(100);
    res.json(signals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch signals" });
  }
});

// ✅ Admin control routes
router.post("/admin/dispatch", requireAdmin, async (req, res) => {
  const { enabled } = req.body;
  DISPATCH_STATE = enabled;
  await AdminConfig.findOneAndUpdate({}, { dispatchEnabled: enabled });
  console.log("🚦 Dispatch toggled:", enabled);
  res.json({ success: true, dispatch: DISPATCH_STATE });
});

router.post("/admin/regime", requireAdmin, async (req, res) => {
  const { mode } = req.body;
  REGIME_MODE = mode;
  await AdminConfig.findOneAndUpdate({}, { regimeMode: mode });
  console.log("📡 Regime set:", REGIME_MODE);
  res.json({ success: true, regime: REGIME_MODE });
});

router.get("/admin/state", requireAdmin, (req, res) => {
  res.json({
    dispatch: DISPATCH_STATE,
    regime: REGIME_MODE,
  });
});

router.post("/admin/test-signal", requireAdmin, async (req, res) => {
  const { message } = req.body;

  req.io.to("trading-alerts").emit("newSignal", {
    symbol: "TEST",
    confidence: 100,
    timestamp: Date.now(),
    message,
  });

  if (global.fcmTokens?.length) {
    await admin.messaging().sendMulticast({
      tokens: global.fcmTokens,
      notification: {
        title: "📡 ULTRA+ Test Broadcast",
        body: message || "This is a test alert",
      },
    });
  }

  res.json({ success: true, sent: true });
});

router.post("/admin/assistant", requireAdmin, async (req, res) => {
  const { question } = req.body;

  try {
    const gptRes = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are ULTRA+, an expert sniper trading assistant developed by Jonomor. Explain signal logic, trade behavior, risk rules, AI behavior and macro filters in human-readable terms.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const answer = gptRes.choices?.[0]?.message?.content;
    res.json({ answer });
  } catch (err) {
    console.error("GPT Assistant error:", err);
    res.status(500).json({ error: "Assistant failed" });
  }
});

router.post("/admin/override", requireAdmin, async (req, res) => {
  const updates = req.body;

  await AdminConfig.findOneAndUpdate({}, updates, { new: true });
  Object.entries(updates).forEach(([key, val]) => {
    console.log(`🛠️ Override applied → ${key}:`, val);
  });

  router.get("/admin/override", requireAdmin, async (req, res) => {
    try {
      const config = await AdminConfig.findOne();
      res.json({
        manualDispatch: config?.manualDispatch ?? false,
        drawdownProtection: config?.drawdownProtection ?? true,
        filterOverride: config?.filterOverride ?? false,
        forcedRegime: config?.forcedRegime ?? "",
      });
    } catch (err) {
      console.error("Override fetch error:", err);
      res.status(500).json({ error: "Failed to load overrides" });
    }
  });
  

  res.json({ success: true, updated: updates });
});

router.get("/admin/stats", requireAdmin, async (req, res) => {
  try {
    const [signalCount, config] = await Promise.all([
      Signal.countDocuments({
        timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // last 24h
      }),
      AdminConfig.findOne(),
    ]);

    res.json({
      signalCount,
      dispatchEnabled: config?.dispatchEnabled,
      regimeMode: config?.regimeMode,
      drawdownProtection: config?.drawdownProtection,
      manualDispatch: config?.manualDispatch,
      filterOverride: config?.filterOverride,
      aiAccuracy: 0.0, // placeholder for now
    });
  } catch (err) {
    console.error("Stats fetch error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ✅ NEW: Admin settings (external controller using Supabase)
router.get("/settings", requireAdmin, adminController.getSettings);
router.post("/settings", requireAdmin, adminController.saveSettings);

// ✅ Export router
export default router;
