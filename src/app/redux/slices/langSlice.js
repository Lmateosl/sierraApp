import { createSlice } from '@reduxjs/toolkit';

// Crear el slice
const langSlice = createSlice({
  name: 'lang',
  initialState: {
    currentLang: 'es',
  },
  reducers: {
    langChange: (state, action) => {
      state.currentLang = action.payload;
    },
  }
});

export default langSlice.reducer;
export const {langChange} = langSlice.actions;