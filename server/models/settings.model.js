// src/models/userSettings.model.js
const mongoose = require('mongoose');
const { SUPPORT_MAIL } = require('../config/envConfig');

const userSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    supportEmail: { type: String, default: `${SUPPORT_MAIL}` },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const userSettingsModel = mongoose.model('UserSettings', userSettingsSchema);
module.exports = userSettingsModel;
