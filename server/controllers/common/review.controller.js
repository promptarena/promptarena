// const reviewModel = require('../../models/review.model');
// const promptModel = require('../../models/prompt.model');
// const {
//   sendSuccessResponse,
//   handleError,
// } = require('../../utils/responseUtils');

// module.exports = {
//   // Create a new review for a prompt
//   createReview: async (req, res, next) => {
//     const { promptId } = req.params;
//     const { rating, comment } = req.body;

//     try {
//       // Find the prompt by ID
//       const prompt = await promptModel.findById(promptId);
//       if (!prompt) {
//         return handleError(next, 'Prompt not found', 404);
//       }

//       // Create the review
//       const review = await reviewModel.create({
//         prompt: promptId,
//         user: req.userID, // Assuming req.userID is available from authentication middleware
//         rating,
//         comment,
//       });

//       // Add the review to the prompt's reviews array
//       prompt.reviews.push(review._id);
//       await prompt.save();

//       return sendSuccessResponse(
//         res,
//         'Review submitted successfully',
//         review,
//         201
//       );
//     } catch (error) {
//       return handleError(next, 'Server error in creating review', 500);
//     }
//   },

//   // Get all reviews for a specific prompt
//   getReviewsForPrompt: async (req, res, next) => {
//     const { promptId } = req.params;

//     try {
//       // Find all reviews associated with the prompt and populate the user details
//       const reviews = await reviewModel
//         .find({ prompt: promptId })
//         .populate('user', 'username');

//       return sendSuccessResponse(res, 'Reviews fetched successfully', reviews);
//     } catch (error) {
//       return handleError(next, 'Server error in fetching reviews', 500);
//     }
//   },
// };

const reviewModel = require("../../models/review.model");
const promptModel = require("../../models/prompt.model");
const { sendSuccessResponse, handleError } = require("../../utils/responseUtils");
const notificationModel = require("../../models/notification.model");

module.exports = {
  // Create a new review for a prompt
  createReview: async (req, res, next) => {
    const { promptId } = req.params;
    const { rating, comment } = req.body;

    try {
      // Find the prompt by ID
      const prompt = await promptModel.findById(promptId);
      if (!prompt) {
        return handleError(next, "Prompt not found", 404);
      }

      // Create the review
      const review = await reviewModel.create({
        prompt: promptId,
        user: req.userID, // Assuming req.userID is available from authentication middleware
        rating,
        comment,
      });

      // Add the review to the prompt's reviews array
      prompt.reviews.push(review._id);
      await prompt.save();
      // Check if req.user is defined
      if (!req.user) {
        console.log("User not authenticated. Skipping notification creation.", req.user);
        return handleError(next, "User not authenticated", 401);
      }

      if (req.user) {
        await notificationModel.create({
          user: prompt.seller, // Use prompt.seller directly
          message: `${req.user.username} left a review on your prompt: "${prompt.title}"`, // Use prompt.title directly
          read: false,
        });
      }

      return sendSuccessResponse(res, "Review submitted successfully", review, 201);
    } catch (error) {
      return handleError(next, "Server error in creating review", 500);
    }
  },

  // Get all reviews for a specific prompt
  getReviewsForPrompt: async (req, res, next) => {
    const { promptId } = req.params;

    try {
      // Find all reviews associated with the prompt and populate the user details
      const reviews = await reviewModel.find({ prompt: promptId }).populate("user", "username profileImage");

      return sendSuccessResponse(res, "Reviews fetched successfully", reviews);
    } catch (error) {
      return handleError(next, "Server error in fetching reviews", 500);
    }
  },

  // Update an existing review
  updateReview: async (req, res, next) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    try {
      // Find the review by ID and verify ownership
      const review = await reviewModel.findOne({
        _id: reviewId,
        user: req.userID,
      });
      if (!review) {
        return handleError(next, "Review not found or unauthorized", 404);
      }

      // Update the review fields
      review.rating = rating || review.rating;
      review.comment = comment || review.comment;
      await review.save();

      return sendSuccessResponse(res, "Review updated successfully", review);
    } catch (error) {
      return handleError(next, "Server error in updating review", 500);
    }
  },

  // Delete an existing review
  deleteReview: async (req, res, next) => {
    const { reviewId } = req.params;

    try {
      // Find the review by ID and verify ownership
      const review = await reviewModel.findOne({
        _id: reviewId,
        user: req.userID,
      });
      if (!review) {
        return handleError(next, "Review not found or unauthorized", 404);
      }

      // Remove the review from the prompt's reviews array
      await promptModel.updateOne({ _id: review.prompt }, { $pull: { reviews: review._id } });

      // Delete the review using deleteOne
      await reviewModel.deleteOne({ _id: reviewId });

      return sendSuccessResponse(res, "Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      return handleError(next, "Server error in deleting review", 500);
    }
  },
};
