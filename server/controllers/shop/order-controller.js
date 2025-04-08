const paypal = require("../../helpers/paypal");
const order = require("../../models/Order");
const cart = require("../../models/cart");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      address,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalPrice,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5175/shop/paypal-return",
        cancel_url: "http://localhost:5175/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalPrice.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log("PayPal Error:", error);
        return res.status(500).json({
          success: false,
          message: "Error during creating paypal payment",
          error: error.message,
        });
      } else {
        const newlyCreatedOrder = new order({
          userId,
          cartItems,
          address,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalPrice,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
          cartId,
        });

        await newlyCreatedOrder.save();
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(200).json({
          success: true,
          orderId: newlyCreatedOrder._id,
          approvalURL,
        });
      }
    });
  } catch (error) {
    console.log("Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { orderId, paymentId, payerId } = req.body;

    let order = await order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;
    await order.save();

    const getCartId = order.cartId;
    const cart = await cart.findById(getCartId);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { createOrder, capturePayment };
