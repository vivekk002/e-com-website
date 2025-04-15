const mongoose = require("mongoose");

const featureImageSchema = new mongoose.Schema({
  image: String,
});

const FeatureImage = mongoose.model("FeatureImage", featureImageSchema);

module.exports = FeatureImage;
