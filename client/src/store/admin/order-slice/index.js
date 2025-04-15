import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  currentOrder: null,
  error: null,
};

// Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get`
    );
    return result.data;
  }
);

// Get a single order by ID
export const getOrderById = createAsyncThunk(
  "adminOrders/getOrderById",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`
    );
    return result.data;
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/status/${id}`,
      { orderStatus },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/delete/${id}`
    );
    return { id, ...result.data };
  }
);

const AdminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all orders
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderList = action.payload.data;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Get a single order by ID
    builder.addCase(getOrderById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload.data;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Update order status
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the order in the list if it exists
      if (state.orderList.length > 0) {
        const index = state.orderList.findIndex(
          (order) => order._id === action.payload.data._id
        );
        if (index !== -1) {
          state.orderList[index] = action.payload.data;
        }
      }
      // Update current order if it's the one being updated
      if (
        state.currentOrder &&
        state.currentOrder._id === action.payload.data._id
      ) {
        state.currentOrder = action.payload.data;
      }
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Delete an order
    builder.addCase(deleteOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      // Remove the deleted order from the list
      state.orderList = state.orderList.filter(
        (order) => order._id !== action.payload.id
      );
      // Clear current order if it's the one being deleted
      if (state.currentOrder && state.currentOrder._id === action.payload.id) {
        state.currentOrder = null;
      }
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearCurrentOrder, clearError } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
