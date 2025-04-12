const express = require("express");
const router = express.Router();
const {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../../controllers/shop/review-controller");
const { authMiddleware } = require("../../controllers/auth/auth-controller");

// Public routes
router.get("/product/:productId", getProductReviews);

// Protected routes
router.post("/product/:productId", authMiddleware, addReview);
router.put("/:reviewId", authMiddleware, updateReview);
router.delete("/:reviewId", authMiddleware, deleteReview);

module.exports = router;
