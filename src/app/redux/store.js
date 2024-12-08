import { configureStore } from "@reduxjs/toolkit";
import getUserReducer from "./slices/getUserSlice";
import getDestinosSlice from "./slices/getDestinosSlice";
import langSlice from "./slices/langSlice";
import getInfoDestinosSlice from "./slices/getInfoDestinosSlice";

const store = configureStore({
    reducer: {
        user: getUserReducer,
        destinos: getDestinosSlice,
        lang: langSlice,
        infoDestinos: getInfoDestinosSlice
    }
});

export default store;