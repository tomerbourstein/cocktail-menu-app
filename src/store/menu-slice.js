import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { generated: false, cocktailsToShow: [] },
  reducers: {
    toggleGenerated(state) {
      state.generated = true;
    },
    replaceCocktailsToShow(state, action) {
      if(action.payload === undefined) {
        return;
      }
      state.cocktailsToShow = [action.payload];
    },
    addCocktailsToShow(state, action) {
      state.cocktailsToShow = [];
      state.cocktailsToShow.push(action.payload);
    },
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
