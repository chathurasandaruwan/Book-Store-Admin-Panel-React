import {createSlice} from "@reduxjs/toolkit";
import {Book} from "../interface/Book.ts";


const initialState : Book[] = [];

const BookSlice = createSlice({
    name: "book",
    initialState: initialState,
    reducers: {
        saveBook:(state,action)=>{
            state.push(action.payload)
        },
        updateBook:(state, action )=>{
            const updateBooks = action.payload
            const index = state.findIndex((book) =>book.id  === updateBooks.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...updateBooks };
            }
        },
        deleteBook: (state, action) => {
            return state.filter(book => book.id !== action.payload);
        },
    }
})

export const {saveBook,updateBook,deleteBook}=BookSlice.actions

export default BookSlice.reducer