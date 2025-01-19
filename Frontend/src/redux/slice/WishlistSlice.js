import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const WishListSlice = createSlice({
  name: "wishList", 
  initialState,
  reducers: {
    addWishList(state, action) {
      const product = action.payload;
      // Check for duplicates
      if (!state.items.some((item) => item.id === product.id)) {
        state.items.push(product);
      }
    },
    removeWishList(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
  },
});

export const { addWishList, removeWishList } = WishListSlice.actions;

export const getWishList = (state) => state.wishlist.items;


export default WishListSlice.reducer;
