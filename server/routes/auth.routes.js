const { Router } = require("express");
const { signup, verifyEmail, login, forgotPassword, resetPassword, getUser, logout } = require("../controllers/user/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const router = Router();
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Auth API",
    statusCode: 200,
    timestamp: Date.now(),
  });
});

router.get('/check-auth', authMiddleware, getUser);
// Signup route
router.post("/signup", signup);
// Verify email route
router.post("/verify-email", verifyEmail);
// Login route
router.post("/login", login);
// Forgot password route
router.post("/forgot-password", forgotPassword);
// Reset password route
router.post("/reset-password/:token", resetPassword);
// Logout route
router.post("/logout", logout);

module.exports = router;
