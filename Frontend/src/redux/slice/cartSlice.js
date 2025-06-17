// redux/slice/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  cart: savedCart,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    updateCartItemQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity < 1) {
          existingItem.quantity = 1;
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeCartItem: (state, action) => {
      const _id = action.payload;
      state.cart = state.cart.filter((item) => item._id !== _id);

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    calculateTotalPrice: (state) => {
      state.totalPrice = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

// Export actions
export const {
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  calculateTotalPrice,
} = cartSlice.actions;

// Selectors
export const getCart = (state) => state.cart.cart;
export const getTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
