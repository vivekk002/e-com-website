const express = require("express");
const FeatureImage = require("../../models/features");

const setFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({
        message: "Image is required",
        success: false,
      });
    }

    const featureImage = await FeatureImage.create({ image });
    return res.status(200).json({
      message: "Feature Image Set Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getFeatureImage = async (req, res) => {
  try {
    const featureImage = await FeatureImage.find();

    return res.status(200).json({
      message: "Feature Image Fetched Successfully",
      success: true,
      data: featureImage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    await FeatureImage.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Feature Image Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  setFeatureImage,
  getFeatureImage,
  deleteFeatureImage,
};
