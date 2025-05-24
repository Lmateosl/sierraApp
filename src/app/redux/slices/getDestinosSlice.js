import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDestinosBySeccion } from '../../../firebase/db';
import { getDestinosPorCategorias } from '../../../firebase/db';

export const getDestinos = createAsyncThunk(
  'destinos/getDestinos',
  async (seccion, thunkApi) => {
    const response = await getDestinosBySeccion(seccion);
    return response;
  }
);

export const getDestinosCat = createAsyncThunk(
  'destinos/getDestinosCat',
  async (categorias, thunkApi) => {
    const response = await getDestinosPorCategorias(categorias);
    return response;
  }
);


// Crear el slice
const getDestinosSlice = createSlice({
  name: 'destinos',
  initialState: {
    destinos: ['hola'],
    status: 'idle',
    requestFinish: false,
    error: null,
  },
  reducers: {
    priceDown: (state) => {
      state.destinos = state.destinos.sort((a, b) => parseInt(b.precio.split('.')[0].split(':')[1].slice(2)) - parseFloat((a.precio.split('.')[0].split(':')[1].slice(2))));
    },
    priceUp: (state) => {
      state.destinos = state.destinos.sort((a, b) => parseInt(a.precio.split('.')[0].split(':')[1].slice(2)) - parseInt(b.precio.split('.')[0].split(':')[1].slice(2)));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDestinos.pending, (state) => {
        state.status = 'loading';
        state.requestFinish = false;
      })
      .addCase(getDestinos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Ordenar destinos según las categorías especificadas
        const prioridad = [
          'Galápagos',
          'Galapagos Islands',
          'Cruise Trips'
        ];
        state.destinos = (action.payload || []).slice().sort((a, b) => {
          const getIndex = (item) => {
            if (!item.categoria) return prioridad.length;
            const idx = prioridad.findIndex(cat => item.categoria === cat);
            return idx === -1 ? prioridad.length : idx;
              };
              const idxA = getIndex(a);
              const idxB = getIndex(b);
              if (idxA !== idxB) return idxA - idxB;
              return 0;
        })
        state.requestFinish = true;
      })
      .addCase(getDestinos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestFinish = true;
      })
      .addCase(getDestinosCat.pending, (state) => {
        state.status = 'loading';
        state.requestFinish = false;
      })
      .addCase(getDestinosCat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.destinos = action.payload;
        state.requestFinish = true;
      })
      .addCase(getDestinosCat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.requestFinish = true;
      });
  },
});

export default getDestinosSlice.reducer;
export const {priceDown, priceUp} = getDestinosSlice.actions;