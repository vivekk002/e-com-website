const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../../controllers/shop/cart-controller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart/:userId/:productId", updateCartItem);
router.delete("/delete/:userId/:productId", deleteCartItem);

module.exports = router;
