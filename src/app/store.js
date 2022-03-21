import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/modeSlice";
import projectReducer from "../features/items/projectSlice";

// Stores for dark-mode and project listing ordering (Work > Projects)
export default configureStore({
  reducer: {
    items: itemsReducer, 
    order: projectReducer
  },
});