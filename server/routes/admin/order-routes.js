const express = require("express");
const {
  fetchAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../../controllers/admin/orders-controller");

const router = express.Router();

// Get all orders
router.get("/get", fetchAllOrders);

// Get a single order by ID
router.get("/details/:id", getOrderById);

// Update order status
router.put("/status/:id", updateOrderStatus);

// Delete an order
router.delete("/delete/:id", deleteOrder);

module.exports = router;
