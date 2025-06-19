// src/redux/slice/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalOrders: 0,
  totalProducts: 0,
  activeOrders: 0,
  completedOrders: 0,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCardStats: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCardStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
