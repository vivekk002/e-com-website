import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import shoppingProductSlice from "./shop/product-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shoppingProducts: shoppingProductSlice,
  },
});

export default store;
