import {configureStore} from "@reduxjs/toolkit";
import BookSlice from "../Slices/BookSlice.ts";
import UserSlice from "../Slices/UserSlice.ts";
import OrderSlice from "../Slices/OrderSlice.ts";

export const store = configureStore({
    reducer:{
        bookData : BookSlice,
        userData : UserSlice,
        orderData: OrderSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
