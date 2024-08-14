import { configureStore } from "@reduxjs/toolkit";
import getUserReducer from "./slices/getUserSlice";

const store = configureStore({
    reducer: {
        user: getUserReducer,
    }
});

export default store;