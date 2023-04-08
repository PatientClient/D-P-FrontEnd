import {
  createSlice
} from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    error: null,
    token: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.token = null
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.error = null;
      state.token = null
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
      state.token = null
    },
  },
});


export const {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;