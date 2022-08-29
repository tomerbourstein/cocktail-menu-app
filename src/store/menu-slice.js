import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { generated: false },
  reducers: {
    toggleGenerated(state) {
      state.generated = true;
    },
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;
