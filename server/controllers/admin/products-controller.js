const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer.toString("base64"));
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      message: "Image uploaded successfully",
      url: result.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error uploading image",
    });
  }
};

//add new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

//edit product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    foundProduct.image = image || foundProduct.image;
    foundProduct.title = title || foundProduct.title;
    foundProduct.description = description || foundProduct.description;
    foundProduct.category = category || foundProduct.category;
    foundProduct.brand = brand || foundProduct.brand;
    foundProduct.price = price === "" ? 0 : price || foundProduct.price;
    foundProduct.salePrice =
      salePrice === "" ? 0 : salePrice || foundProduct.salePrice;
    foundProduct.totalStock =
      totalStock === "" ? 0 : totalStock || foundProduct.totalStock;

    await foundProduct.save();
    res.status(200).json({
      success: true,
      data: foundProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
