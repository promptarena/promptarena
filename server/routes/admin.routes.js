// routes/admin.routes.js
const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, deleteUserById, updateUserById } = require("../controllers/admin/userManagement.controller");
const { isAdmin } = require("../middlewares/adminMiddleware");
const { adminLogin, adminLogout, getAdminProfile, createAdmin, sendAdminNotification } = require("../controllers/admin/auth.controller");
const { getDetailedAnalytics } = require("../controllers/admin/adminAnalytics.controller");
// /api/v1/admin

router.post("/signup", createAdmin);
router.post("/login", adminLogin);
// Add middleware to check if user is admin
router.use(isAdmin);
// Admin authentication routes
router.post("/logout", isAdmin, adminLogout);
router.get("/profile", isAdmin, getAdminProfile);

// Send Admin Notification
router.post("/notifications", isAdmin, sendAdminNotification);

// // User management routes
router.get("/users", isAdmin, getAllUsers);
router.get("/users/:id", isAdmin, getUserById);
router.put("/users/:id", isAdmin, updateUserById);
router.put("/users/:id/role", isAdmin, updateUserById);
router.put("/users/:id/number", isAdmin, updateUserById);
router.delete("/users/:id", isAdmin, deleteUserById);

// Analytics routes
router.get("/dashboard", isAdmin, getDetailedAnalytics);

module.exports = router;