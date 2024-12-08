import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDestinoById } from '../../../firebase/db';

export const getDestinoInfo = createAsyncThunk(
  'infoDestinos/getDestinosById',
  async (id, thunkApi) => {
    const response = await getDestinoById(id);
    return response;
  }
);

// Crear el slice
const getInfoDestinosSlice = createSlice({
  name: 'infoDestino',
  initialState: {
    actualDestino: {title: {titleEs: ''} },
    status: 'plim'
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDestinoInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDestinoInfo.fulfilled, (state, action) => {
        state.actualDestino = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getDestinoInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default getInfoDestinosSlice.reducer;