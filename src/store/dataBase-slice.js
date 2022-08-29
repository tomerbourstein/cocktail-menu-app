import { createSlice, current } from "@reduxjs/toolkit";

const dataBaseSlice = createSlice({
  name: "dataBase",
  initialState: {
    dataBase: [],
    liquers: [],
    preferences: "",
    filterdByLiquer: [],
    randomCocktails: [],
  },
  reducers: {
    fetchData(state, action) {
      state.dataBase = action.payload.dataBase;
      state.liquers = action.payload.liquers.map((element) => {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      });
    },
    setPreference(state, action) {
      state.preferences = action.payload;
    },
    filterByLiquer(state, action) {
      let foundAlcohol = state.dataBase.find(
        (element) => element.main_liquer === action.payload.toLowerCase()
      );
      for (const key in foundAlcohol.cocktail) {
        state.filterdByLiquer.push(foundAlcohol.cocktail[key]);
      }

      
    },
  },
});

export const dataBaseActions = dataBaseSlice.actions;
export default dataBaseSlice;
