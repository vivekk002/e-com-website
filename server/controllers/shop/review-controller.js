const Review = require("../../models/review");
const Product = require("../../models/product");
const User = require("../../models/user");
const Order = require("../../models/Order");

const addReview = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const productPurchased = await Order.findOne({
      userId: userId,
      "cartItems.productId": productId,
    });
    if (!productPurchased) {
      return res.status(404).json({
        success: false,
        message: "You have not purchased this product",
      });
    }

    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await Review.create({
      user: userId,
      userName: user.username || user.name || "Anonymous",
      product: productId,
      rating,
      comment,
    });

    const reviews = await Review.find({ product: productId });
    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      $inc: { reviewCount: 1 },
      averageRating: avgRating,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error adding review",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = await Review.find({ product: productId })
      .populate("user", "username")
      .sort("-createdAt")
      .exec();

    const count = await Review.countDocuments({ product: productId });

    res.status(200).json({
      success: true,
      data: reviews,
      count,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching reviews",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to delete a review",
      });
    }

    const userId = req.user.userId;

    const review = await Review.findOne({ _id: reviewId, user: userId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or you don't have permission to delete it",
      });
    }

    const productId = review.product;
    await review.deleteOne();

    const reviews = await Review.find({ product: productId });
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
        : 0;

    await Product.findByIdAndUpdate(productId, {
      $inc: { reviewCount: -1 },
      averageRating: avgRating,
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting review",
    });
  }
};

module.exports = { addReview, getProductReviews, deleteReview };
