const transactionModel = require("../../models/transaction.model");
const promptModel = require("../../models/prompt.model");
const { sendSuccessResponse, handleError } = require("../../utils/responseUtils");

module.exports = {
  // Create a new purchase transaction
  createPurchase: async (req, res, next) => {
    const { promptId } = req.params;

    try {
      const prompt = await promptModel.findById(promptId);
      if (!prompt) {
        return handleError(next, "Prompt not found", 404);
      }

      const transaction = await transactionModel.create({
        buyer: req.userID,
        prompt: promptId,
        amount: prompt.price,
        status: "pending",
      });

      return sendSuccessResponse(res, "Purchase initiated", transaction, 201);
    } catch (error) {
      return handleError(next, "Server error in creating purchase", 500);
    }
  },

  // Get purchase history for a user
  getUserPurchaseHistory: async (req, res, next) => {
    try {
      const transactions = await transactionModel.find({ buyer: req.userID }).populate("prompt");
      return sendSuccessResponse(res, "Purchase history fetched successfully", transactions);
    } catch (error) {
      return handleError(next, "Server error in fetching purchase history", 500);
    }
  },
};
