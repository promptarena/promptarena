// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     amount: { type: Number, required: true },
//     currency: { type: String, default: "INR" },
//     status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
//     paymentMethod: { type: String, enum: ["credit_card", "stripe"], default: "stripe" },
//     transactionDate: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// const transactionModel = mongoose.model("Transaction", transactionSchema);
// module.exports = transactionModel;

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  prompt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prompt",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
