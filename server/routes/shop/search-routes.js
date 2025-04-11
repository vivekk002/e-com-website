const express = require("express");
const router = express.Router();
const { searchProduct } = require("../../controllers/shop/search-controller");

router.get("/search/:searchQuery", searchProduct);

module.exports = router;
