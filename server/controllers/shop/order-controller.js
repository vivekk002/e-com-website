const paypal = require("../../helpers/paypal");
const order = require("../../models/Order");

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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { createOrder, capturePayment };
