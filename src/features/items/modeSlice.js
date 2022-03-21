import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false
}

// Switch between light and dark-mode
const modeSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setMode(state, action) {
      console.log(action.payload);
      return {
        ...state,
        darkMode: action.payload
      }
    }
  },
});

export const { setMode } = modeSlice.actions;

export default modeSlice.reducer;