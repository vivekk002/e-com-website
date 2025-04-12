import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null,
};

export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async (productId, { rejectWithValue, getState }) => {
    try {
      // Get the auth state from Redux store
      const { auth } = getState();
      const { user } = auth;

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      const result = await axios.get(
        `http://localhost:5000/api/shop/reviews/product/${productId}`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ productId, reviewData }, { rejectWithValue, getState }) => {
    try {
      // Get the auth state from Redux store
      const { auth } = getState();
      const { user } = auth;

      if (!user || !user.userId) {
        return rejectWithValue(
          "Please login to add a review - User not authenticated"
        );
      }

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      const result = await axios.post(
        `http://localhost:5000/api/shop/reviews/product/${productId}`,
        reviewData,
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("Error adding review:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add review"
      );
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, reviewData }, { rejectWithValue, getState }) => {
    try {
      // Get the auth state from Redux store
      const { auth } = getState();
      const { user } = auth;

      if (!user || !user.userId) {
        return rejectWithValue(
          "Please login to update a review - User not authenticated"
        );
      }

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      const result = await axios.put(
        `http://localhost:5000/api/shop/reviews/${reviewId}`,
        reviewData,
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update review"
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue, getState }) => {
    try {
      // Get the auth state from Redux store
      const { auth } = getState();
      const { user } = auth;

      if (!user || !user.userId) {
        return rejectWithValue(
          "Please login to delete a review - User not authenticated"
        );
      }

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      const result = await axios.delete(
        `http://localhost:5000/api/shop/reviews/${reviewId}`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reviews
      .addCase(fetchProductReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("fetched revies", action.payload);
        state.reviews = action.payload.data;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.reviews = [];
      })
      // Add review
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("added review", action.payload);
        state.reviews.push(action.payload.data);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      // Update review
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.reviews.findIndex(
          (review) => review._id === action.payload.data._id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload.data;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete review
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.meta.arg
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
