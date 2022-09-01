import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { generated: false, isChecked: false, cocktailsToShow: [], favoritesShow: false, favoritesList: [] },
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
    },
    addToFavorites(state, action) {
      state.favoritesList.push(action.payload);
    },
    toggleChecked(state) {
      state.isChecked = !state.isChecked;
    }
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
