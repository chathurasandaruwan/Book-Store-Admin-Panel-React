import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Book} from "../interface/Book.ts";
import axios from "axios";

const initialState : Book[] = [];

const api = axios.create({
    baseURL : "http://localhost:3000/book"
});
// connect with database
//save book
export const addBook = createAsyncThunk(
    'book/saveBook',
    async (book : Book)=>{
        try {
            const response = await api.post('/add',book);
            return response.data;
        }catch (error) {
            return console.log('error',error)
        }
    }
)
// get All books
export const getBooks = createAsyncThunk(
    'book/getBook',
    async ()=>{
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error) {
            return console.log('error',error)
        }
    }
)
//slice manage
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
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addBook.fulfilled,(state, action)=>{
                state.push(action.payload)
                console.log("book save fulfilled")
            })
            .addCase(addBook.pending,(state,action)=>{
                console.log("Pending");
            })
            .addCase(addBook.rejected,(state,action)=>{
                console.log("Failed to save book: ",action.payload);
            });
        builder
            .addCase(getBooks.fulfilled,(state, action)=>{
                console.log("books get fulfilled");
                state = action.payload;
                state.map((book)=>{
                    console.log(book.image)
                })
                return state;
            })
            .addCase(getBooks.pending,(state,action)=>{
                console.log("Pending");
            })
            .addCase(getBooks.rejected,(state,action)=>{
                console.log("Failed to get book: ",action.payload);
            });
    }
})

export const {saveBook,updateBook,deleteBook}=BookSlice.actions

export default BookSlice.reducer