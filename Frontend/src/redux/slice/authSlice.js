import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  loading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = AuthSlice.actions;

export const getAuth = (state) => state.auth.user;
export default AuthSlice.reducer;
