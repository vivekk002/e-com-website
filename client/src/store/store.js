import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import shoppingProductSlice from "./shop/product-slice";
import shoppingCartSlice from "./shop/cart-slice";
import addressSlice from "./shop/address-slice";
import shoppingOrderSlice from "./shop/order-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shoppingProducts: shoppingProductSlice,
    shoppingCart: shoppingCartSlice,
    addressData: addressSlice,
    shoppingOrder: shoppingOrderSlice,
  },
});

export { store };
