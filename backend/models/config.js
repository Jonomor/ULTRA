import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema({
  dispatchEnabled: { type: Boolean, default: false },
  regimeMode: { type: String, default: "auto" },
  forcedRegime: { type: String, default: "" },
  filterOverride: { type: Boolean, default: false },
  drawdownProtection: { type: Boolean, default: true },
  manualDispatch: { type: Boolean, default: false },
}, { timestamps: true });


export default mongoose.model("AdminConfig", ConfigSchema);
const AdminConfig = mongoose.models.AdminConfig || mongoose.model("AdminConfig", ConfigSchema);