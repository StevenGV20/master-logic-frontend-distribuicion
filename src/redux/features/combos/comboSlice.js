import { createSlice } from "@reduxjs/toolkit";

/* export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('http://localhost:5006/api/Solicitudes/lista/sedes');
  const data = await response.json();
  return data;
});
 */
export const sedeSlice = createSlice({
  name: "sede",
  initialState: {
    value: [],
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    getSedes: async (state) => {
      const fetchSedes = async (data) => {
        const response = await fetch(
          `http://localhost:5006/api/Solicitudes/lista/sedes`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        return response.json();
      };

      const data = await fetchSedes();
      console.log(data);
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,getSedes } = sedeSlice.actions;

export default sedeSlice.reducer;

export const selectAllPosts = state => state.posts
