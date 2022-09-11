import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {loggedIn: false, registerForm: false},
    reducers: {
        login() {},
        showRegisterForm(state, action) {
            state.registerForm = action.payload;
        },
    } 
})

export const profileActions = profileSlice.actions;
export default profileSlice;