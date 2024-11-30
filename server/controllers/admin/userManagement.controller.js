// //------------- controllers/admin/userManagement.controller.js -------------
const userModel = require("../../models/user.model");
const { sendSuccessResponse, handleError } = require("../../utils/responseUtils");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userModel.find().select("-password");
      return sendSuccessResponse(res, "All users fetched successfully", users);
    } catch (error) {
      return handleError(next, "Error fetching users", 500);
    }
  },

  getUserById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await userModel.findById(id).select("-password");
      if (!user) {
        return handleError(next, "User not found", 404);
      }
      return sendSuccessResponse(res, "User fetched successfully", user);
    } catch (error) {
      return handleError(next, "Error fetching user", 500);
    }
  },

  updateUserById: async (req, res, next) => {
    const { id } = req.params;
    console.log('id: ', id);
    const updateData = req.body; // Fields to update
    console.log('updateData: ', updateData);

    try {
      const updatedUser = await userModel
        .findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        })
        .select("-password");

      if (!updatedUser) {
        return handleError(next, "User not found", 404);
      }
      return sendSuccessResponse(res, "User updated successfully", updatedUser);
    } catch (error) {
      return handleError(next, "Error updating user", 500);
    }
  },

  deleteUserById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedUser = await userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        return handleError(next, "User not found", 404);
      }

      // Optionally: Delete associated data (prompts, purchases, reviews, etc.)
      return sendSuccessResponse(res, "User deleted successfully", {});
    } catch (error) {
      return handleError(next, "Error deleting user", 500);
    }
  },
};