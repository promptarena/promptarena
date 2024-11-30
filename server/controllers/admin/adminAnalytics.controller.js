const userModel = require("../../models/user.model");
const promptModel = require("../../models/prompt.model");
const transactionModel = require("../../models/transaction.model");
const reviewModel = require("../../models/review.model");
const notificationModel = require("../../models/notification.model");
const { handleError, sendSuccessResponse } = require("../../utils/responseUtils");

module.exports = {
  getDetailedAnalytics: async (req, res, next) => {
    try {
      // User Analytics
      const totalUsers = await userModel.countDocuments({});
      const buyersCount = await userModel.countDocuments({ role: "buyer" });
      const sellersCount = await userModel.countDocuments({ role: "seller" });
      const adminsCount = await userModel.countDocuments({ role: "admin" });
      const newUsers = await userModel.find({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }}).countDocuments(); // New users in the last 30 days

      // Prompt Analytics
      const totalPrompts = await promptModel.countDocuments({});
      const activePrompts = await promptModel.countDocuments({ isActive: true });
      const inactivePrompts = totalPrompts - activePrompts;
      const promptsCreatedLast30Days = await promptModel.find({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }}).countDocuments(); // Prompts created in the last 30 days

      // Transaction Analytics
      const totalRevenue = await transactionModel.aggregate([
        { $match: { status: "completed" }},
        { $group: { _id: null, total: { $sum: "$amount" }}}
      ]);
      const totalTransactions = await transactionModel.countDocuments({});
      const completedTransactions = await transactionModel.countDocuments({ status: "completed" });

      // Review Analytics
      const totalReviews = await reviewModel.countDocuments({});
      const averageRating = await reviewModel.aggregate([
        { $group: { _id: null, avgRating: { $avg: "$rating" }}}
      ]);

      // Notification Analytics
      const totalNotifications = await notificationModel.countDocuments({});
      const readNotifications = await notificationModel.countDocuments({ read: true });

      return sendSuccessResponse(res, "Detailed analytics fetched successfully", {
        userAnalytics: {
          totalUsers,
          buyersCount,
          sellersCount,
          adminsCount,
          newUsers
        },
        promptAnalytics: {
          totalPrompts,
          activePrompts,
          inactivePrompts,
          promptsCreatedLast30Days
        },
        transactionAnalytics: {
          totalRevenue: totalRevenue[0]?.total || 0,
          totalTransactions,
          completedTransactions
        },
        reviewAnalytics: {
          totalReviews,
          averageRating: averageRating[0]?.avgRating || 0
        },
        notificationAnalytics: {
          totalNotifications,
          readNotifications
        }
      });
    } catch (error) {
      return handleError(next, error.message || "Server Error in Detailed Analytics", 500);
    }
  }
};
