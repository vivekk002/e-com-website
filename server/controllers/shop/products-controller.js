const product = require("../../models/product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-asc" } = req.query;

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-asc":
        sort.price = 1;
        break;
      case "price-desc":
        sort.price = -1;
        break;
      case "name-asc":
        sort.title = 1;
        break;
      case "name-desc":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await product.find(filters).sort(sort);
    return res.status(200).json({
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

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchedProduct = await product.findById(id);
    if (!fetchedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: fetchedProduct,
      message: "Product fetched successfully",
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
  getProductDetails,
};
