import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { generated: false, favoritesShow: false, favoritesList: [], dialog: false, customCocktailShow: false, menuShow: true },
  reducers: {
    toggleGenerated(state) {
      state.generated = true;
    },
    openFavorites(state) {
      state.favoritesShow =  true;
      state.customCocktailShow =  false;
      state.menuShow = false;
    },
    openMenu(state) {
      state.menuShow = true;
      state.favoritesShow = false;
      state.customCocktailShow = false;
    },
    openCustomCocktails(state) {
      state.customCocktailShow = true;
      state.favoritesShow  = false;
      state.menuShow = false;
    },
    addToFavorites(state, action) {
      state.favoritesList.push(action.payload);
    },
    removeFromFavorites(state, action) {
      let foundCocktail = state.favoritesList.filter(
        (fav) => fav.name !== action.payload
      );
      console.log(foundCocktail);
      state.favoritesList = foundCocktail;
    },
    toggleDialog(state) {
      state.dialog = !state.dialog;
    }
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
