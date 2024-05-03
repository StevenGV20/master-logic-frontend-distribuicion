import { createSlice } from "@reduxjs/toolkit";

/* export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('http://localhost:5006/api/Solicitudes/lista/sedes');
  const data = await response.json();
  return data;
});
 */
export const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    token: localStorage.getItem("USUARIO_TOKEN"),
  },
  reducers: {
    getToken: (state) => {
      state.value = localStorage.getItem("USUARIO_TOKEN");
    },
  },
});

// Action creators are generated for each case reducer function
export const { getToken } = utilsSlice.actions;

export default utilsSlice.reducer;

