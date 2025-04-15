import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const fetchAllReviews = createAsyncThunk(
  "products/fetchAllReviews",
  async (productId) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/reviews/get/${productId}`
    );
    return result.data;
  }
);

export const addReview = createAsyncThunk(
  "products/addReview",
  async ({ userId, productId, reviewData }) => {
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `http://localhost:5000/api/shop/reviews/add/${productId}`,
      {
        userId,
        productId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  }
);

export const deleteReview = createAsyncThunk(
  "products/deleteReview",
  async ({ reviewId }) => {
    console.log("reviewId", reviewId);
    const token = localStorage.getItem("token");

    const result = await axios.delete(
      `http://localhost:5000/api/shop/reviews/delete/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReviews.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      })
      .addCase(addReview.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      })
      .addCase(deleteReview.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
