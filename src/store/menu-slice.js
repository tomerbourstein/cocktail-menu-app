import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    generated: false,
    favoritesShow: false,
    favoritesList: [],
    changed: false,
    dialog: false,
    customCocktailShow: false,
    menuShow: false,
    loginPageShow: true,
  },
  reducers: {
    toggleGenerated(state, action) {
      state.generated = action.payload;
    },
    openFavorites(state) {
      state.favoritesShow = true;
      state.menuShow = false;
      state.customCocktailShow = false;
      state.loginPageShow = false;
    },
    openMenu(state) {
      state.favoritesShow = false;
      state.menuShow = true;
      state.customCocktailShow = false;
      state.loginPageShow = false;
    },
    openCustomCocktails(state) {
      state.favoritesShow = false;
      state.menuShow = false;
      state.customCocktailShow = true;
      state.loginPageShow = false;
    },
    openLoginPage(state) {
      state.favoritesShow = false;
      state.menuShow = false;
      state.customCocktailShow = false;
      state.loginPageShow = true;
    },
    addToFavorites(state, action) {
      state.changed = true;
      state.favoritesList.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.changed = true;
      let foundCocktail = state.favoritesList.filter(
        (fav) => fav.name !== action.payload
      );
      state.favoritesList = foundCocktail;
    },
    replaceFavorites(state, action) {
      if (action.payload === null) {
        state.favoritesList = [];
      } else {
        state.favoritesList = action.payload;
      }
    },
    toggleDialog(state) {
      state.dialog = !state.dialog;
    },
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
