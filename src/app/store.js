import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/modeSlice";

export default configureStore({
  reducer: {
    items: itemsReducer, 
  },
});