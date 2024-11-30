// const settingsModel = require("../../models/settings.model");
// const { handleError, sendSuccessResponse } = require("../../utils/responseUtils");

// module.exports = {
//   getSettings: async (req, res, next) => {
//     try {
//       let settings = await settingsModel.findOne();
//       if (!settings) {
//         settings = new settingsModel();
//         await settings.save();
//       }

//       return sendSuccessResponse(res, "Settings fetched successfully", settings, 200);
//     } catch (error) {
//       return handleError(next, error.message || "Server Error Comes in Get Settings Controller", 400);
//     }
//   },

//   updateSettings: async (req, res, next) => {
//     try {
//       const updatedSettings = await settingsModel.findOneAndUpdate({}, req.body, {
//         new: true,
//         upsert: true,
//         runValidators: true,
//       });

//       return sendSuccessResponse(res, "Settings updated successfully", updatedSettings, 200);
//     } catch (error) {
//       return handleError(next, error.message || "Server Error Comes in Update Settings Controller", 400);
//     }
//   },
// };

// src/controllers/settings.controller.js
const userSettingsModel = require('../../models/settings.model');
const { handleError, sendSuccessResponse } = require('../../utils/responseUtils');

module.exports = {
  getUserSettings: async (req, res, next) => {
    try {
      const userId = req.user._id; // Assuming you have user info from JWT or session
      console.log('userId: ', userId);
      let settings = await userSettingsModel.findOne({ userId });
      console.log('settings: ', settings);

      if (!settings) {
        settings = new userSettingsModel({ userId });
        await settings.save();
      }

      return sendSuccessResponse(
        res,
        'User settings fetched successfully',
        settings,
        200
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Error fetching user settings',
        500
      );
    }
  },

  updateTheme: async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { theme } = req.body;

      const updatedSettings = await userSettingsModel.findOneAndUpdate(
        { userId },
        { theme },
        { new: true, runValidators: true }
      );

      return sendSuccessResponse(
        res,
        'Theme updated successfully',
        updatedSettings,
        200
      );
    } catch (error) {
      return handleError(next, error.message || 'Error updating theme', 500);
    }
  },

  updateAdminSettings: async (req, res, next) => {
    try {
      const { supportEmail } = req.body;

      // Assuming there's only one admin-controlled settings document, or use specific ID if required
      const updatedSettings = await userSettingsModel.findOneAndUpdate(
        {},
        { supportEmail },
        { new: true, runValidators: true }
      );

      return sendSuccessResponse(
        res,
        'Admin settings updated successfully',
        updatedSettings,
        200
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Error updating admin settings',
        500
      );
    }
  },
};
