const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
} = require('../controllers/common/notification.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Delete all notifications
router.delete('/', authMiddleware, deleteAllNotifications);

// Get all notifications for a user
router.get('/all', authMiddleware, getNotifications);

// Mark a notification as read
router.put('/:notificationId/read', authMiddleware, markAsRead);

// Mark all notifications as read
router.put('/mark-all-as-read', authMiddleware, markAllAsRead);

// Delete a notification
router.delete('/:notificationId', authMiddleware, deleteNotification);

module.exports = router;