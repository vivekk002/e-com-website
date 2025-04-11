const Address = require("../../models/address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, state, pincode, phone, notes } = req.body;

    if (
      !userId ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !phone ||
      !notes
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      state,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();
    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in adding address",
    });
  }
};
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const addressList = await Address.find({ userId });

    return res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching address",
    });
  }
};
const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { userId, _id: addressId },
      formData,
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in updating address",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }
    const deletedAddress = await Address.findOneAndDelete({
      userId,
      _id: addressId,
    });
    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: deletedAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in adding address",
    });
  }
};

module.exports = { addAddress, fetchAllAddress, updateAddress, deleteAddress };
