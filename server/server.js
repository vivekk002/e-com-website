const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth-routes");
const adminProductRoutes = require("./routes/admin/product-routes");
const shopProductRoutes = require("./routes/shop/products-routes");
mongoose
  .connect(
    "mongodb+srv://vivekkumar054:vivek054@cluster0.30grw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5174",
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
app.use("/api/shop/products", shopProductRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
