import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { generated: false, favoritesShow: false, favoritesList: [] },
  reducers: {
    toggleGenerated(state) {
      state.generated = true;
    },
    toggleFavorites(state) {
      state.favoritesShow = !state.favoritesShow;
    },
    addToFavorites(state, action) {
      state.favoritesList.push(action.payload);
    },
    removeFromFavorites(state, action) {
      let foundCocktail = state.favoritesList.filter(
        (fav) => fav.name !== action.payload
      );
      state.favoritesList = foundCocktail;
    },
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
