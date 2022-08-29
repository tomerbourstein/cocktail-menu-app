import { createSlice } from "@reduxjs/toolkit/";

const inputSlice = createSlice({
  name: "input",
  initialState: { alcohol: "", amount: "" },
  reducers: {
    enterAlcohol(state, action) {
      state.alcohol = action.payload.alcohol;
      console.log(state.alcohol);
    },
    enterAmount(state, action) {
      state.amount = action.payload.amount;
    },
    increment(state) {
      if(state.amount <= 3) {
        state.amount++;
      }
    },
    decrement (state) {
      if (state.amount > 1){
        state.amount--;
      }
    }
  }, 
});

export const inputActions = inputSlice.actions;
export default inputSlice;
