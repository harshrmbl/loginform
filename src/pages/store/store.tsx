import { configureStore } from "@reduxjs/toolkit";
import valueSclice  from "../counter/counterSlice";

const store = configureStore({
    reducer:{
        value: valueSclice,
    },
});

export type rootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;