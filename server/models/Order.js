const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: String,
    },
  ],
  address: {
    addressId: String,
    address: String,
    city: String,
    state: String,
    pin: String,
    phone: String,
    note: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalPrice: String,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

module.exports = mongoose.model("Order", orderSchema);
