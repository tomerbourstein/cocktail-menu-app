import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { loggedIn: false, isRegisterForm: false, currentProfile: null },
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    toggleRegisterForm(state) {
      state.isRegisterForm = !state.isRegisterForm;
    },
    logout(state) {
      state.loggedIn = false;
      state.currentProfile = null;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
