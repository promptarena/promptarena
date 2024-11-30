const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} = require('../../services/emailService');
const { CLIENT_URL, APP_NAME } = require('../../config/envConfig');
const { hashPassword, comparePassword } = require('../../utils/passwordUtils');
const {
  generateTokenAndSetCookie,
  createVerificationToken,
  createResetToken,
} = require('../../utils/tokenUtils');
const userModel = require('../../models/user.model');
const {
  handleError,
  sendSuccessResponse,
} = require('../../utils/responseUtils');
const notificationModel = require('../../models/notification.model');
module.exports = {
  signup: async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    if (!username || !email || !password) {
      return handleError(next, 'All fields are required', 400);
    }
    if (username.length < 3) {
      return handleError(
        next,
        'Username must be at least 3 characters long',
        400
      );
    }
    try {
      const [existingUser, existingUserName] = await Promise.all([
        userModel.findOne({ email }),
        userModel.findOne({ username }),
      ]);
      if (existingUserName) {
        return handleError(
          next,
          'Username already exists, please choose a different one',
          400
        );
      }
      if (existingUser) {
        return handleError(next, 'User already exists', 400);
      }
      const hashedPassword = await hashPassword(password);
      const verificationToken = createVerificationToken();
      const user = await userModel.create({
        email,
        username,
        password: hashedPassword,
        verificationToken,
        name: username,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        lastLogin: Date.now(),
      });
      if (!user) {
        return handleError(next, 'User not created', 400);
      }
      
      console.log(user);
      console.log(user._id);
      console.log(res);

      generateTokenAndSetCookie(res, user._id);

      user.lastLogin = Date.now();
      await sendVerificationEmail(user.email, verificationToken);
      // Send success response
      return sendSuccessResponse(
        res,
        'User registered successfully',
        {
          ...user._doc,
          _id: user._id,
          username: user.username,
          email: user.email,
          verificationToken: user.verificationToken,
          verificationTokenExpiresAt: user.verificationTokenExpiresAt,
          lastLogin: user.lastLogin,
        },
        201
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error Comes in Signup Controller',
        400
      );
    }
  },

  verifyEmail: async (req, res, next) => {
    const { code } = req.body;
    if (!code) {
      return handleError(next, 'All fields are required', 400);
    }
    try {
      const user = await userModel.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: { $gt: Date.now() },
      });
      if (!user) {
        return handleError(next, 'Invalid or expired verification token', 400);
      }
      user.isVerified = true;
      user.verificationToken = null;
      user.verificationTokenExpiresAt = null;
      await user.save();
      await sendWelcomeEmail(user.email, user.username);

      await notificationModel.create({
        user: user._id,
        message: `Welcome to ${APP_NAME}, ${user.username}!`,
        read: false,
      });

      return sendSuccessResponse(
        res,
        'Email verified successfully',
        { ...user._doc },
        200
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error Comes in Verify Email Controller',
        400
      );
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleError(next, 'All fields are required', 400);
    }

    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        return handleError(next, 'User not found', 401);
      }

      //check match password
      if (!(await comparePassword(password, user.password))) {
        return handleError(next, 'Invalid credentials', 401);
      }

      if (!user.isVerified) {
        return handleError(next, 'Please verify your email', 401);
      }

      generateTokenAndSetCookie(res, user._id);
      user.lastLogin = Date.now();
      await user.save();

      return sendSuccessResponse(
        res,
        'Logged in successfully',
        { ...user._doc },
        200
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error Comes in Login Controller',
        400
      );
    }
  },

  logout: async (req, res, next) => {
    try {
      res.clearCookie('token');
      return sendSuccessResponse(res, 'Logged out successfully', {}, 200);
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error Comes in Logout Controller',
        400
      );
    }
  },

  forgotPassword: async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      return handleError(next, 'Email is required', 400);
    }

    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return handleError(next, `No user with email ${email}`, 404);
      }

      const resetToken = createResetToken();
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
      await user.save();

      await sendPasswordResetEmail(email, resetToken);

      return sendSuccessResponse(
        res,
        'Password reset link sent to your email',
        {},
        200
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error Comes in Forgot Password Controller',
        400
      );
    }
  },

  resetPassword: async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return handleError(
        next,
        'Password must be at least 6 characters long',
        400
      );
    }

    try {
      const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() },
      });

      if (!user) {
        return handleError(next, 'Invalid or expired token', 400);
      }

      user.password = await hashPassword(password);
      user.resetPasswordToken = null;
      user.resetPasswordExpiresAt = null;
      await user.save();

      await sendResetSuccessEmail(user.email);
      await notificationModel.create({
        user: user._id,
        message: `Your password has been reset successfully, ${user.username}!`,
        read: false,
      });

      return sendSuccessResponse(res, 'Password reset successfully', {}, 200);
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error Comes in Reset Password Controller',
        400
      );
    }
  },

  getUser: async (req, res, next) => {
    try {
      const user = await userModel.findById(req.userID).select('-password');
      return sendSuccessResponse(
        res,
        'User fetched successfully',
        { ...user._doc },
        200
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error Comes in Get User Controller',
        400
      );
    }
  },
};