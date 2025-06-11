import mongoose from 'mongoose';

const FavoriteTagSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', default: null},
  tagId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventTag', default: null },
}, { timestamps: true });

const FavoriteTag = mongoose.model('FavoriteTag', FavoriteTagSchema);

export default FavoriteTag;
