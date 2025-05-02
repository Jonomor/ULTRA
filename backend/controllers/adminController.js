import db from "../db/index.js";
import AdminConfig from "../models/AdminConfig.js";

// ✅ Supabase: Get per-symbol presets
async function getSettings(req, res) {
  try {
    const { data, error } = await db.from("settings").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Supabase: Save per-symbol presets
async function saveSettings(req, res) {
  try {
    const { symbol, preset } = req.body;
    const { data, error } = await db
      .from("settings")
      .upsert({ symbol, preset }, { onConflict: "symbol" });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Mongoose AdminConfig support (unchanged)
export const getState = async (req, res) => {
  const config = await AdminConfig.findOne();
  res.json(config);
};

export const toggleDispatch = async (req, res) => {
  const { enabled } = req.body;
  const config = await AdminConfig.findOne();
  config.dispatchEnabled = enabled;
  await config.save();
  res.json({ success: true });
};

export default {
  getSettings,
  saveSettings,
};
