import { configureStore } from "@reduxjs/toolkit";
import sedeReducer from "./features/combos/sedeSlice";
import utilsReducer from "./features/utils/utilsSlice";
import ubigeoReducer from "./features/combos/ubigeoSlice";

export default configureStore({
  reducer: {
    sede: sedeReducer,
    utils: utilsReducer,
    ubigeo: ubigeoReducer,
  },
});
