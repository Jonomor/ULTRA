// backend/models/AdminConfig.js
import mongoose from 'mongoose';

const AdminConfigSchema = new mongoose.Schema({
  dispatchEnabled: { type: Boolean, default: false },
  regimeMode: { type: String, default: 'auto' },
  manualDispatch: { type: Boolean, default: false },
  drawdownProtection: { type: Boolean, default: true },
  filterOverride: { type: Boolean, default: false },
  forcedRegime: { type: String, default: '' },
});

// ✅ Fix OverwriteModelError
const AdminConfig = mongoose.models.AdminConfig || mongoose.model('AdminConfig', AdminConfigSchema);

export default AdminConfig;
