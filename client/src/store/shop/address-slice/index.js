import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData) => {
    try {
      if (!addressData) {
        return {
          success: false,
          message: "Address data is required",
        };
      }
      const response = await axios.post(
        "http://localhost:5000/api/shop/address/add",
        addressData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const fetchAddressList = createAsyncThunk(
  "address/fetchAddressList",
  async (userId) => {
    try {
      if (!userId) {
        return {
          success: false,
          message: "User ID is required",
        };
      }
      const response = await axios.get(
        `http://localhost:5000/api/shop/address/get/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ userId, addressId, formdata }) => {
    try {
      if (!userId || !addressId || !formdata) {
        return {
          success: false,
          message: "Address data is required",
        };
      }
      const response = await axios.put(
        `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
        formdata
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }) => {
    try {
      if (!userId || !addressId) {
        return {
          success: false,
          message: "User ID and Address ID are required",
        };
      }
      const response = await axios.delete(
        `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const addressSlice = createSlice({
  name: "addressData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddressList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAddressList.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
