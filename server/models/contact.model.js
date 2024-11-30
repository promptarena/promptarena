// models/contact.model.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);
