// const { Router } = require('express');
// const { getSettings, updateSettings } = require('../controllers/user/settings.controller');
// const adminMiddleware = require('../middlewares/authMiddleware');

// const router = Router();

// router.put('/', adminMiddleware, updateSettings);
// router.get('/', getSettings);

// module.exports = router;

// src/routes/userSettings.routes.js
const { Router } = require('express');
const {
  getUserSettings,
  updateTheme,
  updateAdminSettings,
} = require('../controllers/user/settings.controller');
const isAuthenticated = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const router = Router();

router.get('/', isAuthenticated, getUserSettings);
router.put('/theme', isAuthenticated, updateTheme);
router.put('/admin/settings', isAuthenticated, isAdmin, updateAdminSettings);

module.exports = router;
