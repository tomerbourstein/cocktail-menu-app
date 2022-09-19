import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { loggedIn: false, token: null, isRegisterForm: false },
  reducers: {

    login(state, action) {
      state.token = action.payload.token;
      state.loggedIn = action.payload.loggedIn;
    },
    toggleRegisterForm(state) {
      state.isRegisterForm = !state.isRegisterForm;
    },
    resetRegisterForm(state) {
      state.isRegisterForm = false;
    },
    logout(state) {
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
