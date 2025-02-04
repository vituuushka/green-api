import { configureStore } from "@reduxjs/toolkit";
import {authReducer, chatReducer} from './slices/chatSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;