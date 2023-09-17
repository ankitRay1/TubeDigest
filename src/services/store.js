import { configureStore } from "@reduxjs/toolkit";
import { summaryApi } from "./summary";

export const store = configureStore({
    reducer: {
        [summaryApi.reducerPath]: summaryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(summaryApi.middleware),
});
