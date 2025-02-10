// redux/slice/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
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
    // Action to update the quantity of a cart item
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity < 1) {
          existingItem.quantity = 1; // Prevent quantity from going below 1
        }
      }
    },
    // Action to remove a cart item
    removeCartItem: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    // Action to calculate total price
    calculateTotalPrice: (state) => {
      state.totalPrice = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const {
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  calculateTotalPrice,
} = cartSlice.actions;

// Selector to get the cart items
export const getCart = (state) => state.cart.cart;

// Selector to get the total price
export const getTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
