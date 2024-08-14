import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserDocument } from '../../../firebase/db';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (userId, thunkApi) => {
    const response = await getUserDocument(userId);
    return response;
  }
);

// Crear el slice
const getUserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: ['hola'],
    status: 'idle',
    requestFinish: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userData = ['hola'];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.requestFinish = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        state.requestFinish = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestFinish = true;
      });
  },
});

export default getUserSlice.reducer;
export const {logout} = getUserSlice.actions;
