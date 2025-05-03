import mongoose from 'mongoose';

const ResponseSchema = new mongoose.Schema({
  userId: String,
  signalId: mongoose.Schema.Types.ObjectId,
  action: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Response', ResponseSchema);
