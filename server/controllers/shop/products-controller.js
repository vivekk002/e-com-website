const product = require("../../models/product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category, brand, priceRange, sortBy, search } = req.query;

    const products = await product.find({});
    res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getFilteredProducts,
};
