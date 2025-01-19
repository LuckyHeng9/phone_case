// redux/slice/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add a cart item
    addCartItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity < 1) {
          existingItem.quantity = 1;
        }
      }
    },
    removeCartItem: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
  },
});

export const { addCartItem, updateCartItemQuantity, removeCartItem } = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export default cartSlice.reducer;
