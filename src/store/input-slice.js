import { createSlice } from "@reduxjs/toolkit/";

const inputSlice = createSlice({
  name: "input",
  initialState: {
    preferences: "",
    onChangeAlcohol: "",
    onChangeAmount: "",
  },
  reducers: {
    setPreference (state,action) {
      state.preferences = action.payload;
    },
    enterAlcohol(state, action) {
      state.onChangeAlcohol = action.payload.alcohol;
    },
    enterAmount(state, action) {
      state.onChangeAmount = action.payload.amount;
    },
    increment(state) {
      if (state.onChangeAmount <= 3) {
        state.onChangeAmount++;
      }
    },
    decrement(state) {
      if (state.onChangeAmount > 1) {
        state.onChangeAmount--;
      }
    },
  },
});

export const inputActions = inputSlice.actions;
export default inputSlice;
