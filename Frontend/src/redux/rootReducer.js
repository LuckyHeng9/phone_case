import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import WishlistSliceReducer from "./slice/WishlistSlice";
import cartSliceReducer from "./slice/cartSlice";
import  casePhoneReducer  from "./slice/casePhoneSlice";
import productReducer from "./slice/productSlice";
import dashboardReducer from "./slice/dashboardSlice";

export default combineReducers({
  auth: authReducer,
  wishlist: WishlistSliceReducer,
  cart: cartSliceReducer,
  casePhone: casePhoneReducer,
  products: productReducer,
  dashboard: dashboardReducer,
  
});
