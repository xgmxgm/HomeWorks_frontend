'use client';

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import authReducer from "./authSlice"
import homeWorksReducer from "./HomeWorksSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        isAuth: authReducer,
        homeWorks: homeWorksReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>