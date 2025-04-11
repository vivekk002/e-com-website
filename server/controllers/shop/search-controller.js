const Product = require("../../models/product");

const searchProduct = async (req, res) => {
  try {
    const { searchQuery } = req.params;
    if (!searchQuery || typeof searchQuery !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid search query", success: false });
    }
    const regEX = new RegExp(searchQuery, "i");
    const createSearchQuery = {
      $or: [
        { title: { $regex: regEX } },
        { description: { $regex: regEX } },
        { category: { $regex: regEX } },
        { brand: { $regex: regEX } },
      ],
    };
    const products = await Product.find(createSearchQuery);
    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { searchProduct };
