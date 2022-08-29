import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./input-slice";
import menuSlice from "./menu-slice";
import cocktailsListSlice from "./cocktails-list-slice";
const store = configureStore({
  reducer: {
    input: inputSlice.reducer,
    menu: menuSlice.reducer,
    cocktails: cocktailsListSlice.reducer,
  },
});
export default store;
