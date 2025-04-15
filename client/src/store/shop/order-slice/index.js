import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoding: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
        orderData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ orderId, paymentId, payerId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
      { orderId, paymentId, payerId }
    );
    return response.data;
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "order/getAllOrdersByUser",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/details/${orderId}`
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoding = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoding = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(capturePayment.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoding = false;
      })
      .addCase(capturePayment.rejected, (state, action) => {
        state.isLoding = false;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoding = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state, action) => {
        state.isLoding = false;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoding = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoding = false;
      });
  },
});

export default shoppingOrderSlice.reducer;
