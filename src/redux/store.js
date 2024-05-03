import { configureStore } from "@reduxjs/toolkit";
import sedeReducer from "./features/combos/sedeSlice";

export default configureStore({
  reducer: {
    sede: sedeReducer,
  },
});
