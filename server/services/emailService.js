// services/emailService.js

const { CLIENT_URL, APP_NAME, SUPPORT_MAIL } = require('../config/envConfig');
const sendEmail = require('../config/nodemailer');
const {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  NEWSLETTER_SUBSCRIPTION_TEMPLATE,
  CONTACT_FORM_TEMPLATE,
} = require('../utils/emailTemplates');

const regardsMessage = 'Your PromptArena Team';
const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    to: email,
    subject: 'Verify your email',
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      '{verificationCode}',
      verificationToken
    ).replace('{regardsText}', regardsMessage),
  };

  try {
    await sendEmail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending verification email to ${email}:`, error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};
const sendWelcomeEmail = async (email, username) => {
  const loginLink = `${CLIENT_URL}/login`;

  const mailOptions = {
    to: email,
    subject: `Welcome to ${APP_NAME}!`,
    html: WELCOME_EMAIL_TEMPLATE.replace('{name}', username)
      .replace('{regardsText}', regardsMessage)
      .replace('{loginLink}', loginLink),
  };

  try {
    await sendEmail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending welcome email to ${email}:`, error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${CLIENT_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    to: email,
    subject: 'Reset Your Password',
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      '{resetURL}',
      resetUrl
    ).replace('{regardsText}', regardsMessage),
  };

  try {
    await sendEmail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending password reset email to ${email}:`, error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    to: email,
    subject: 'Password Reset Successful',
    html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
      '{regardsText}',
      regardsMessage
    ),
  };

  try {
    await sendEmail(mailOptions);
    console.log(`Password reset success email sent to ${email}`);
  } catch (error) {
    console.error(
      `Error sending password reset success email to ${email}:`,
      error
    );
    throw new Error(
      `Error sending password reset success email: ${error.message}`
    );
  }
};

const sendDeleteAccountEmail = async (email) => {
  const mailOptions = {
    to: email,
    subject: 'Account Deleted',
    html: 'Your account has been deleted.',
  };
  try {
    await sendEmail(mailOptions);
    console.log(`Account deletion email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending account deletion email to ${email}:`, error);
    throw new Error(`Error sending account deletion email: ${error.message}`);
  }
};

const subscribeToNewsletter = async (email) => {
  const mailOptions = {
    to: email,
    subject: 'Subscribe to our newsletter',
    html: NEWSLETTER_SUBSCRIPTION_TEMPLATE.replace('{email}', email),
  };
  try {
    await sendEmail(mailOptions);
    console.log(`Newsletter subscription email sent to ${email}`);
  } catch (error) {
    console.error(
      `Error sending newsletter subscription email to ${email}:`,
      error
    );
    throw new Error(
      `Error sending newsletter subscription email: ${error.message}`
    );
  }
};

const sendContactFormEmail = async (name, phone, email, message) => {
  const mailOptions = {
    to: SUPPORT_MAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: CONTACT_FORM_TEMPLATE.replace('{name}', name)
      .replace('{email}', email)
      .replace('{message}', message)
      .replace('{phone}', phone),
  };

  try {
    await sendEmail(mailOptions);
    console.log(`Contact form email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending contact form email to ${email}:`, error);
    throw new Error(`Error sending contact form email: ${error.message}`);
  }
};

module.exports = {
  sendContactFormEmail,
  subscribeToNewsletter,
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendDeleteAccountEmail,
};
