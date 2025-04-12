const Review = require("../../models/review");
const Product = require("../../models/product");

// Add a new review
const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to add a review - User not authenticated",
      });
    }

    const userId = req.user.userId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user has already reviewed this product
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

    // Create new review
    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    // Update product's average rating
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

// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Review.countDocuments({ product: productId });

    res.status(200).json({
      success: true,
      data: reviews,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching reviews",
    });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to update a review",
      });
    }

    const userId = req.user.userId;

    const review = await Review.findOne({ _id: reviewId, user: userId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or you don't have permission to update it",
      });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update product's average rating
    const reviews = await Review.find({ product: review.product });
    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(review.product, {
      averageRating: avgRating,
    });

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error updating review",
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Check if user is authenticated
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

    // Update product's average rating
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

module.exports = { addReview, getProductReviews, updateReview, deleteReview };
