const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  approvalURL: null,
  isLoding: false,
  order: null,
};

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.isLoding = true;
    });
  },
});

export default shoppingOrderSlice.reducer;
