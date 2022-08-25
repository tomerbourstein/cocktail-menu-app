import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./input-slice";
import menuSlice from "./menu-slice";

const store = configureStore({
  reducer: {
    input: inputSlice.reducer,
    menu: menuSlice.reducer,
  },
});
export default store;
