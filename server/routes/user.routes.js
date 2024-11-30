const { Router } = require('express');
const multer = require('multer');
const {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
  changePassword,
  deleteUserProfile,
  getUserProfileByUsername,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
} = require('../controllers/user/profile.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
});
const { multerErrorHandler } = require('../utils/responseUtils');

const router = Router();
// Get user profile
router.get('/profile', authMiddleware, getUserProfile);
//Find user profile by name
router.get('/profile/:username', getUserProfileByUsername);
// Update user profile (including name, bio, and profile image)
router.put(
  '/profile',
  authMiddleware,
  upload.single('profileImage'),
  multerErrorHandler,
  updateUserProfile
);
// Upload only profile image
router.post(
  '/profile/image',
  authMiddleware,
  upload.single('profileImage'),
  multerErrorHandler,
  uploadProfileImage
);
// Change user password
router.put('/profile/password', authMiddleware, changePassword);
// Delete user profile
router.delete('/profile', authMiddleware, deleteUserProfile);

// Follow User
router.post('/profile/:userId/follow', authMiddleware, followUser);

// Unfollow User
router.post('/profile/:userId/unfollow', authMiddleware, unfollowUser);

// Get Followers
router.get('/profile/followers/:userId', getFollowers);

// Get Following
router.get('/profile/followings/:userId', getFollowings);

module.exports = router;
