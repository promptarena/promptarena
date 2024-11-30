// const express = require("express");
// const router = express.Router();
// const { createReview, getReviewsForPrompt } = require("../controllers/common/review.controller");
// const authMiddleware = require("../middlewares/authMiddleware");

// // Check review routes
// router.get("/", (req, res) => {
//     res.send("Review Routes");
// });
// // Submit a review
// router.post("/:promptId/review", authMiddleware, createReview);

// // Get all reviews for a prompt
// router.get("/:promptId/reviews", getReviewsForPrompt);



// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsForPrompt,
  updateReview,
  deleteReview,
} = require('../controllers/common/review.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Check review routes
router.get('/', (req, res) => {
  res.send('Review Routes');
});

// Submit a review
router.post('/:promptId/review', authMiddleware, createReview);

// Get all reviews for a prompt
router.get('/:promptId/reviews', getReviewsForPrompt);

// Update a review
router.put('/:reviewId', authMiddleware, updateReview);

// Delete a review
router.delete('/:reviewId', authMiddleware, deleteReview);

module.exports = router;
