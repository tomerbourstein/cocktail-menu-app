import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { generated: false, favoritesShow: false, favoritesList: [], dialog: false, visible: true },
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
      console.log(foundCocktail);
      state.favoritesList = foundCocktail;
    },
    // fadeFavorites(state, action) {
    //   console.log(current(state.favoritesList));
    //   let foundCocktail = state.favoritesList.find(
    //     (fav) => fav.name === action.payload
    //   );
    //   if(foundCocktail) {
    //     state.visible = false;
    //   }
    // },
    toggleDialog(state) {
      state.dialog = !state.dialog;
    }
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
