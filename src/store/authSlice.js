// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
userProfile: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    state.userProfile = action.payload.userProfile;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
       state.userProfile = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
