import { configureStore } from "@reduxjs/toolkit";
import sedeReducer from "./features/combos/sedeSlice";
import utilsReducer from "./features/utils/utilsSlice";

export default configureStore({
  reducer: {
    sede: sedeReducer,
    utils: utilsReducer,
  },
});
