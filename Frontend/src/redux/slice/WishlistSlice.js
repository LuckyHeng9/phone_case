import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage (if it exists)
const localWishList = JSON.parse(localStorage.getItem("wishlist")) || [];

const initialState = {
  items: localWishList,
};

const WishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addWishList(state, action) {
      const product = action.payload;
      if (!state.items.some((item) => item._id === product._id)) {
        state.items.push(product);
        // Save updated list to localStorage
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },
    removeWishList(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
      // Save updated list back to localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { addWishList, removeWishList } = WishListSlice.actions;
export const getWishList = (state) => state.wishlist.items;

export default WishListSlice.reducer;
