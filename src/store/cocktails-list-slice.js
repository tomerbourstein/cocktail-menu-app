import { createSlice } from "@reduxjs/toolkit";

const cocktailsListSlice = createSlice({
  name: "cocktails",
  initialState: { cocktailsList: [], liquers: [] },
  reducers: {
    fetchData(state, action) {
      state.cocktailsList = action.payload.cocktailsList;
      state.liquers = action.payload.liquers.map(element => {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      });
    },
  },
});

export const cocktailsListActions = cocktailsListSlice.actions;
export default cocktailsListSlice;
