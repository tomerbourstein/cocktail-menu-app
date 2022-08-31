import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./input-slice";
import menuSlice from "./menu-slice";
import dataBaseSlice from "./dataBase-slice";
const store = configureStore({
  reducer: {
    input: inputSlice.reducer,
    menu: menuSlice.reducer,
    dataBase: dataBaseSlice.reducer,
  },
});
export default store;
