const express = require("express");
const router = express.Router();
const { searchProduct } = require("../../controllers/shop/search-controller");

router.get("/:searchQuery", searchProduct);

module.exports = router;
