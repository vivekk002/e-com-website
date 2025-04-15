require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth-routes");
const adminProductRoutes = require("./routes/admin/product-routes");
const adminOrderRoutes = require("./routes/admin/order-routes");
const shopProductRoutes = require("./routes/shop/products-routes");
const shopCartRoutes = require("./routes/shop/cart-routes");
const shopAddressRoutes = require("./routes/shop/address-route");
const shopOrderRoutes = require("./routes/shop/order-routes");
const shopSearchRoutes = require("./routes/shop/search-routes");
const shopReviewRoutes = require("./routes/shop/review-routes");
const featureRoutes = require("./routes/common/feature-routes");

// MongoDB connection with additional options
mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/shop/products", shopProductRoutes);
app.use("/api/shop/cart", shopCartRoutes);
app.use("/api/shop/address", shopAddressRoutes);
app.use("/api/shop/order", shopOrderRoutes);
app.use("/api/shop/search", shopSearchRoutes);
app.use("/api/shop/reviews", shopReviewRoutes);
app.use("/api/common/feature", featureRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
