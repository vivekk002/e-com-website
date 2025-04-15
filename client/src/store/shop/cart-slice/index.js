import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue({
          success: false,
          message: "User ID is required",
        });
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || "Failed to fetch cart items",
      });
    }
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/api/shop/cart/add/${userId}/${productId}`,
        {
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || "Failed to add item to cart",
      });
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_API_URL
      }/api/shop/cart/delete/${userId}/${productId}`
    );
    return response.data;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/api/shop/cart/update-cart/${userId}/${productId}`,
      { quantity }
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
