const express = require("express");
const router = express.Router();
const {
  setFeatureImage,
  getFeatureImage,
  deleteFeatureImage,
} = require("../../controllers/common/feature-controllers");

router.post("/set", setFeatureImage);
router.get("/get", getFeatureImage);
router.delete("/delete/:id", deleteFeatureImage);
module.exports = router;
