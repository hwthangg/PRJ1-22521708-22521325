import mongoose from 'mongoose';

const ResponseAISchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', default: null },
  requirement: { type: String, default: null },
  response: { type: String, default: null }
}, { timestamps: true });

const ResponseAI = mongoose.model('ResponseAI', ResponseAISchema);

export default ResponseAI
