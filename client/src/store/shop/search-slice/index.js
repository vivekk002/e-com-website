import { createSlice, createAsyncThunk } from "reduxjs/toolkit";
import axios from "axios";

// Create async thunk for searching products
export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/shop/search/${searchQuery}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  searchResults: [],
  isLoading: false,
  error: null,
  success: false,
};

// Create the search slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      // Handle fulfilled state
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
        state.success = action.payload.success;
      })
      // Handle rejected state
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "An error occurred during search";
        state.success = false;
      });
  },
});

// Export actions
export const { clearSearchResults } = searchSlice.actions;

// Export reducer
export default searchSlice.reducer;
