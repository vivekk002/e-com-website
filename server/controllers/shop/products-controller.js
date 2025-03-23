const product = require("../../models/product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-asc" } = req.query;
    console.log(req.query);
    let filters = {};

    if (category.length > 0) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length > 0) {
      filters.brand = { $in: brand.split(",") };
    }

    console.log(filters.category);

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

module.exports = {
  getFilteredProducts,
};
