const express = require("express");
const router = express.Router();
const {
  addReview,
  getProductReviews,
  deleteReview,
} = require("../../controllers/shop/review-controller");
const { authMiddleware } = require("../../controllers/auth/auth-controller");

router.get("/get/:productId", getProductReviews);
router.post("/add/:productId", authMiddleware, addReview);
router.delete("/delete/:reviewId", authMiddleware, deleteReview);

module.exports = router;
