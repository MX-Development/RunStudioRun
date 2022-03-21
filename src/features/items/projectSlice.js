import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showOrdered: false
}

// Switch between ordered and unordered view in the Work > Projects list
const projectSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShowOrdered(state, action) {
      console.log(action.payload);
      return {
        ...state,
        showOrdered: action.payload
      }
    }
  },
});

export const { setShowOrdered } = projectSlice.actions;

export default projectSlice.reducer;