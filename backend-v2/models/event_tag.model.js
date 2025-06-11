import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const EventTagSchema = new Schema({
  name: { type: String, default: null }
}, {
  timestamps: true
});



const EventTag = model('EventTag', EventTagSchema);
export default EventTag;
