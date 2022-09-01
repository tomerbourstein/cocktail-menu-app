import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { generated: false, cocktailsToShow: [], favoritesShow: false, favoritesList: [] },
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
    removeFromFavorites(state, action) {
      
     let foundCocktail = state.favoritesList.filter(fav => fav.name !== action.payload);
     state.favoritesList = foundCocktail;

    }
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
