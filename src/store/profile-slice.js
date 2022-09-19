import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { logged: false, token: null,profileEmail: "", isRegisterForm: false },
  reducers: {

    login(state, action) {
      state.token = action.payload.token;
      state.logged = action.payload.loggedIn;
      state.profileEmail = action.payload.email;
      console.log(state.profileEmail);
    },
    toggleRegisterForm(state) {
      state.isRegisterForm = !state.isRegisterForm;
    },
    resetRegisterForm(state) {
      state.isRegisterForm = false;
    },
    logout(state) {
      state.token = null;
      state.logged = false;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
