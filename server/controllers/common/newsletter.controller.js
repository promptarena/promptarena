// controllers/common/newsletter.controller.js
const subscriberModel = require('../../models/subscriber.model');
const {
  handleError,
  sendSuccessResponse,
} = require('../../utils/responseUtils');
const { subscribeToNewsletter } = require('../../services/emailService');

module.exports = {
  subscribeToNewsletter: async (req, res, next) => {
    const { email } = req.body;

    // Email validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return handleError(next, 'Invalid email format', 400);
    }

    if (!email) {
      return handleError(next, 'Email is required', 400);
    }

    try {
      const existingSubscriber = await subscriberModel.findOne({ email });
      if (existingSubscriber) {
        return handleError(next, 'Already subscribed', 400);
      }

      const newSubscriber = await subscriberModel.create({ email });

      await subscribeToNewsletter(email);
      return sendSuccessResponse(
        res,
        'Subscribed successfully!',
        newSubscriber,
        201
      );
    } catch (error) {
      return handleError(next, error.message || 'Subscription failed', 500);
    }
  },

  unsubscribeFromNewsletter: async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      return handleError(next, 'Email is required', 400);
    }

    try {
      const subscriber = await subscriberModel.findOneAndDelete({ email });
      if (!subscriber) {
        return handleError(next, 'Not subscribed', 404);
      }
      return sendSuccessResponse(res, 'Unsubscribed successfully!');
    } catch (error) {
      return handleError(next, error.message || 'Unsubscription failed', 500);
    }
  },
};
