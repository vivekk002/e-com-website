import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImage: [],
  error: null,
};

export const setFeatureImage = createAsyncThunk(
  "common/setFeatureImage",
  async (image) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/set`,
      { image }
    );
    return result.data;
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",
  async (imageId) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/common/feature/delete/${imageId}`
    );
    return result.data;
  }
);

export const fetchFeatureImage = createAsyncThunk(
  "common/fetchFeatureImage",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`
    );
    return result.data;
  }
);

const FeatureImageSlice = createSlice({
  name: "featureImages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Set Feature Image cases
    builder
      .addCase(setFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Don't update the featureImage array here, let fetchFeatureImage handle it
      })
      .addCase(setFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch Feature Image cases
      .addCase(fetchFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Make sure we're accessing the correct property from the response
        state.featureImage = action.payload.data || [];
      })
      .addCase(fetchFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.featureImage = [];
      })
      // Delete Feature Image cases
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default FeatureImageSlice.reducer;
