import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./input-slice";

const store = configureStore({
  reducer: {
    input: inputSlice.reducer,
  },
});
export default store;
