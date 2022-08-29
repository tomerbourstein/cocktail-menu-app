import { createSlice } from "@reduxjs/toolkit/";

const inputSlice = createSlice({
  name: "input",
  initialState: { alcohol: "", amount: "" },
  reducers: {
    enterAlcohol(state, action) {
      state.alcohol = action.payload.alcohol;
    },
    enterAmount(state, action) {
      state.amount = action.payload.amount;
    },
  },
});

export const inputActions = inputSlice.actions;
export default inputSlice;
