import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import WishlistSliceReducer from "./slice/WishlistSlice";
import cartSliceReducer from "./slice/cartSlice";

export default combineReducers({
  auth: authReducer,
  wishlist: WishlistSliceReducer,
  cart: cartSliceReducer,
});
