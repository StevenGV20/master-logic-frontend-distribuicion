// dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Definir una acción asincrónica para cargar datos desde la API
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch("http://localhost:5006/api/Solicitudes/lista/sedes");
  const data = await response.json();
  console.log(data);
  return data;
});

export const sedeSlice = createSlice({
  name: 'sede',
  initialState: {
    lista: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lista = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getSedes = (state) => state.lista;

export default sedeSlice.reducer;