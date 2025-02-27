import {configureStore} from "@reduxjs/toolkit";
import BookSlice from "../Slices/BookSlice.ts";
import UserSlice from "../Slices/UserSlice.ts";
import OrderSlice from "../Slices/OrderSlice.ts";
import AuthSlice from "../Slices/AuthSlice.ts";

export const store = configureStore({
    reducer:{
        bookData : BookSlice,
        userData : UserSlice,
        orderData: OrderSlice,
        authData:AuthSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { getState } = store;