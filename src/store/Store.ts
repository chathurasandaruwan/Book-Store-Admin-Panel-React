import {configureStore} from "@reduxjs/toolkit";
import BookSlice from "../Slices/BookSlice.ts";
import UserSlice from "../Slices/UserSlice.ts";

export const store = configureStore({
    reducer:{
        bookData : BookSlice,
        userData : UserSlice,
    }
})