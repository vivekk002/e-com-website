import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/search/${encodeURIComponent(
          searchQuery
        )}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Network error occurred" }
      );
    }
  }
);

const initialState = {
  searchResults: [],
  isLoading: false,
  error: null,
  success: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
