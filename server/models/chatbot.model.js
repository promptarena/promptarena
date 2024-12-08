const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    model: { type: String },
    userMessage: { type: String },
    assistantResponse: { type: String },
    timestamp: { type: Date, default: Date.now },
    seed: { type: Number },
  },
  { timestamps: true }
); // Correct placement of { timestamps: true }

module.exports = mongoose.model('Chatbot', chatSchema);
