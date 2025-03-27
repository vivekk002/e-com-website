import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import shoppingProductSlice from "./shop/product-slice";
import shoppingCartSlice from "./shop/cart-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shoppingProducts: shoppingProductSlice,
    shoppingCart: shoppingCartSlice,
  },
});

export { store };
