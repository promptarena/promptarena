const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin'],
      default: 'buyer', // Default role is buyer
    },
    profileImage: {
      type: String,
      default:
        'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg', // Default profile image
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio must not exceed 500 characters'],
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpiresAt: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false, // Email verification status
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpiresAt: {
      type: Date,
      default: null,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to other users
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to users this user is following
      },
    ],
    joinedAt: {
      type: Date,
      default: Date.now, // Date of account creation
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);
// Pre-save middleware to remove spaces from the username
userSchema.pre('save', function (next) {
  this.username = this.username.replace(/\s+/g, ''); // Remove all spaces
  next();
});
// Export the User model
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
