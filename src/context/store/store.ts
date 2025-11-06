import { configureStore } from "@reduxjs/toolkit";
import paginationData from "../paginationSlice.js";

export const store = configureStore({
    reducer: {
        paginationState: paginationData
    }
});

// Types for the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;