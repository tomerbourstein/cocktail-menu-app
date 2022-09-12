import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { loggedIn: false, registerForm: false, currentProfile: null },
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    showRegisterForm(state, action) {
      state.registerForm = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.currentProfile = null;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
