import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/modeSlice";
import projectReducer from "../features/items/projectSlice";

export default configureStore({
  reducer: {
    items: itemsReducer, 
    order: projectReducer
  },
});