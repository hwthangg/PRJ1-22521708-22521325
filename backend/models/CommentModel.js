const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['visible', 'deleted'],
    default: 'visible'
  }
});

module.exports = mongoose.model('Comment', CommentSchema, 'CommentCollection');
