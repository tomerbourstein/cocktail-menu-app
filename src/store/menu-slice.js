import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { generated: false, cocktailsToShow: [], favoritesShow: false },
  reducers: {
    toggleGenerated(state) {
      state.generated = true;
    },
    replaceCocktailsToShow(state, action) {
      if(action.payload === undefined) {
        return;
      }
      state.cocktailsToShow = action.payload;
    },
    toggleFavorites(state) {
      state.favoritesShow = !state.favoritesShow;
    }
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
