const express = require("express");
const router = express.Router();
const { createPurchase, getUserPurchaseHistory } = require("../controllers/user/purchase.controller");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a new purchase
router.post("/:promptId/purchase", authMiddleware, createPurchase);

// Get user purchase history
router.get("/history", authMiddleware, getUserPurchaseHistory);

module.exports = router;