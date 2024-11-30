// controllers/admin/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
const { JWT_SECRET } = require('../../config/envConfig');
const {
  handleError,
  sendSuccessResponse,
} = require('../../utils/responseUtils');
const { hashPassword } = require('../../utils/passwordUtils');
const notificationModel = require('../../models/notification.model');
// Create a new admin
exports.createAdmin = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  try {
    if (role !== 'admin') {
      return handleError(next, 'Only admins can create admins', 400);
    }
    // Input validation (Add more as needed)
    if (!username || !email || !password || !role) {
      return handleError(next, 'All fields are required', 400);
    }
    // check username is exist
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return handleError(next, 'Username already exists', 400);
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return handleError(next, 'User with this email already exists', 400);
    }
    // Create a new user with admin role
    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    await newUser.save();
    // Create a new admin document
    const newAdmin = new userModel({
      username,
      email,
      password: hashedPassword,
      role,
      isVerified: true,
      // ... other admin details
    });
    return sendSuccessResponse(res, 'Admin created successfully', {
      admin: newAdmin,
    });
  } catch (error) {
    return handleError(next, error.message || 'Error creating admin', 500);
  }
};

// Admin Login
exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // Validate input fields
  if (!email || !password) {
    return handleError(next, 'Email and password are required', 400);
  }
  try {
    // Find user by email
    const user = await userModel.findOne({ email, role: 'admin' });
    // If user not found or not admin
    if (!user) {
      return handleError(next, 'Unauthorized - Admin not found', 401);
    }
    // Validate password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return handleError(next, 'Unauthorized - Incorrect password', 401);
    }
    // Generate JWT token
    const token = jwt.sign({ userID: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1d', // Token expiry
    });
    // Send token in cookie and response
    res.cookie('token', token, { httpOnly: true });
    return sendSuccessResponse(res, 'Admin logged in successfully', {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return handleError(
      next,
      error.message || 'Server Error during admin login',
      500
    );
  }
};
// Admin Logout
exports.adminLogout = (req, res, next) => {
  res.clearCookie('token');
  return sendSuccessResponse(res, 'Admin logged out successfully', {});
};

// Admin Profile
exports.getAdminProfile = async (req, res, next) => {
  try {
    const admin = await userModel.findById(req.userID).select('-password');
    if (!admin || admin.role !== 'admin') {
      return handleError(next, 'Admin not found', 404);
    }
    return sendSuccessResponse(
      res,
      'Admin profile fetched successfully',
      admin
    );
  } catch (error) {
    return handleError(
      next,
      error.message || 'Server Error fetching admin profile',
      500
    );
  }
};

exports.sendAdminNotification = async (req, res, next) => {
  const { message, userIds } = req.body;

  try {
    // 1. Validation
    if (!message) {
      return handleError(next, 'Message is required', 400);
    }

    // 2. Get target users (all or specific users)
    let targetUsers;
    if (userIds && Array.isArray(userIds) && userIds.length > 0) {
      targetUsers = await userModel.find({ _id: { $in: userIds } });
    } else {
      // Send to all users
      targetUsers = await userModel.find({});
    }

    // 3. Create notifications for each target user
    const notificationPromises = targetUsers.map((user) =>
      notificationModel.create({
        user: user._id,
        message: message,
        read: false,
      })
    );
    await Promise.all(notificationPromises);

    return sendSuccessResponse(res, 'Admin notification sent successfully', {});
  } catch (error) {
    return handleError(next, 'Error sending admin notification', 500);
  }
};
