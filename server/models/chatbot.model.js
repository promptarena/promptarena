const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    userMessage: { type: String, required: true },
    assistantResponse: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    seed: { type: Number, required: false },
  },
  { timestamps: true }
); // Correct placement of { timestamps: true }

module.exports = mongoose.model('Chatbot', chatSchema);
