import { createSlice } from "@reduxjs/toolkit";

const dataBaseSlice = createSlice({
  name: "dataBase",
  initialState: { dataBase: [], liquers: [] },
  reducers: {
    fetchData(state, action) {
      state.dataBase = action.payload.dataBase;
      state.liquers = action.payload.liquers.map(element => {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      });
    },
  },
});

export const dataBaseActions = dataBaseSlice.actions;
export default dataBaseSlice;
