import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  loading: true,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  token: null,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setLoading, loginSuccess, logout } = AuthSlice.actions;
export const getAuth = (state) => state.auth.user;
export default AuthSlice.reducer;
