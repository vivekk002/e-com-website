const express = require("express");
const router = express.Router();
const {
  addReview,
  getProductReviews,
  deleteReview,
} = require("../../controllers/shop/review-controller");
const { authMiddleware } = require("../../controllers/auth/auth-controller");

router.get("/product/:productId", getProductReviews);
router.post("/product/:productId", authMiddleware, addReview);
router.delete("/:reviewId", authMiddleware, deleteReview);

module.exports = router;
