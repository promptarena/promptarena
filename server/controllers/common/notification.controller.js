const notificationModel = require('../../models/notification.model');
const {
  sendSuccessResponse,
  handleError,
} = require('../../utils/responseUtils');

module.exports = {
  // Get notifications for the user
  getNotifications: async (req, res, next) => {
    try {
      const notifications = await notificationModel.find({ user: req.userID });
      return sendSuccessResponse(
        res,
        'Notifications fetched successfully',
        notifications
      );
    } catch (error) {
      return handleError(next, 'Server error in fetching notifications', 500);
    }
  },

  // Mark notification as read
  markAsRead: async (req, res, next) => {
    try {
      const notification = await notificationModel.findByIdAndUpdate(
        req.params.notificationId,
        { read: true },
        { new: true }
      );
      if (!notification) {
        return handleError(next, 'Notification not found', 404);
      }
      return sendSuccessResponse(
        res,
        'Notification marked as read',
        notification
      );
    } catch (error) {
      return handleError(next, 'Server error in marking notification', 500);
    }
  },

  // Mark all notifications as read
  markAllAsRead: async (req, res, next) => {
    try {
      await notificationModel.updateMany({ user: req.userID }, { read: true });
      return sendSuccessResponse(
        res,
        'All notifications marked as read',
        {} // You can return an empty object or a success message
      );
    } catch (error) {
      return handleError(
        next,
        'Server error in marking all notifications as read',
        500
      );
    }
  },

  // Delete a notification
  deleteNotification: async (req, res, next) => {
    try {
      const notification = await notificationModel.findOneAndDelete({
        _id: req.params.notificationId,
        user: req.userID, // Ensure the notification belongs to the user
      });
      if (!notification) {
        return handleError(next, 'Notification not found', 404);
      }
      return sendSuccessResponse(res, 'Notification deleted successfully', {});
    } catch (error) {
      return handleError(next, 'Server error in deleting notification', 500);
    }
  },
  // Delete all notifications for the user
  deleteAllNotifications: async (req, res, next) => {
    try {
      await notificationModel.deleteMany({ user: req.userID });
      return sendSuccessResponse(
        res,
        'All notifications deleted successfully',
        {}
      );
    } catch (error) {
      console.log(error);
      return handleError(
        next,
        'Server error in deleting all notifications',
        500
      );
    }
  },
};
