// redux/slice/ProductSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../base_url";
import axios from "axios";


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token"); 

      const response = await axios.get(
        `${base_url}/products/get-all-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const getProducts = (state) => state.products.data;
export const getProductLoading = (state) => state.products.loading;
export const getProductError = (state) => state.products.error;

export default productSlice.reducer;