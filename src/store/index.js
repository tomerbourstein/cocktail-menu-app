import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./input-slice";
import menuSlice from "./menu-slice";
import dataBaseSlice from "./dataBase-slice";
import profileSlice from "./profile-slice";
const store = configureStore({
  reducer: {
    input: inputSlice.reducer,
    menu: menuSlice.reducer,
    dataBase: dataBaseSlice.reducer,
    profile: profileSlice.reducer
  },
});
export default store;
