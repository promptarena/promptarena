// controllers/common/contact.controller.js
const contactModel = require('../../models/contact.model');
const {
  handleError,
  sendSuccessResponse,
} = require('../../utils/responseUtils');
const { sendContactFormEmail } = require('../../services/emailService');

const validateInput = (firstName, email, message, phone) => {
  if (!firstName || !email || !message) {
    return { valid: false, message: 'All fields are required' };
  }
  if (firstName.length < 3) {
    return { valid: false, message: 'Name must be at least 3 characters long' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Please enter a valid email' };
  }
//   if (message.length < 10) {
//     return {
//       valid: false,
//       message: 'Message must be at least 10 characters long',
//     };
//   }
  if (phone) {
    if (!/^\d+$/.test(phone)) {
      return { valid: false, message: 'Phone number must be numeric' };
    }
    if (phone.length !== 10) {
      return {
        valid: false,
        message: 'Phone number must be exactly 10 digits long',
      };
    }
  }
  return { valid: true };
};

module.exports = {
  submitContactForm: async (req, res, next) => {
    const { firstName, lastName, phone, email, message } = req.body;
    const validation = validateInput(firstName, email, message, phone);
    if (!validation.valid) {
      return handleError(next, validation.message, 400);
    }

    try {
      const newContact = await contactModel.create({
        firstName,
        lastName,
        phone,
        email,
        message,
      });

      let name;
      if (!lastName) {
        name = firstName;
      } else {
        name = `${firstName} ${lastName}`;
      }
      await sendContactFormEmail(name, phone, email, message);

      return sendSuccessResponse(
        res,
        'Message sent successfully!',
        newContact,
        201
      );
    } catch (error) {
      return handleError(next, error.message || 'Failed to send message', 500);
    }
  },
};
