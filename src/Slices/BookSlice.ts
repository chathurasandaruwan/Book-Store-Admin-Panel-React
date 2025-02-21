import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Book} from "../interface/Book.ts";
import axios from "axios";
import { toast } from "react-toastify";

const initialState : Book[] = [];

const api = axios.create({
    baseURL : "http://localhost:3000/book"
});
// connect with database
//save book
export const addBookData = createAsyncThunk(
    'book/saveBook',
    async (book : Book,{ rejectWithValue })=>{
        //set delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await api.post('/add',book);
            return response.data;
        }catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)
// get All books
export const getBooksData = createAsyncThunk(
    'book/getBook',
    async (arg,{ rejectWithValue })=>{
        //set delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)
//update book
export const updateBookData = createAsyncThunk(
    'book/updateBook',
    async ({ id, book }: { id: string; book: Book },{ rejectWithValue }) => {
        try {
            const response = await api.put('/update/'+id, book);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
//delete book
export const deleteBookData = createAsyncThunk(
    'book/deleteBook',
    async (id:string,{ rejectWithValue }) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await api.delete('/delete/'+id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
//slice manage
const BookSlice = createSlice({
    name: "book",
    initialState: {
        books : initialState,
        loading: false,
    },
    reducers: {
        saveBook:(state,action)=>{
            state.books.push(action.payload)

        },
        updateBook:(state, action )=>{
            const updateBooks = action.payload
            const index = state.books.findIndex((book) =>book.id  === updateBooks.id);
            if (index !== -1) {
                state.books[index] = { ...state.books[index], ...updateBooks };
            }
        },
        deleteBook: (state, action) => {
            state.books.filter(book => book.id !== action.payload);
            return state
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addBookData.fulfilled,(state, action)=>{
                state.books.push(action.payload)
                state.loading = false
                toast.success("Book added successfully!");
            })
            .addCase(addBookData.pending,(state)=>{
                state.loading = true
            })
            .addCase(addBookData.rejected,(state, action)=>{
                toast.error(`Failed to save book: ${action.payload}`);
                state.loading = false
            });
        builder
            .addCase(getBooksData.fulfilled,(state, action)=>{
                state.loading = false
                state.books = action.payload;
                return state;
            })
            .addCase(getBooksData.pending,(state)=>{
                state.loading = true
            })
            .addCase(getBooksData.rejected,(state, action)=>{
                toast.error(`Failed to get book: ${action.payload}`);
                state.loading = false
            });
        builder
            .addCase(updateBookData.fulfilled,(state, action)=>{
                toast.success("Book updated successfully!");
                state.loading = false
                state.books = state.books.map((book:Book)=>(
                    book.id==action.payload.id ? {...book,title : action.payload.title, author : action.payload.author,price:action.payload.price,description:action.payload.description,
                        category:action.payload.category,image:action.payload.image,stock:action.payload.stock} : book
                ))
                return state
            })
            .addCase(updateBookData.pending,(state)=>{
                state.loading = true
            })
            .addCase(updateBookData.rejected,(state, action)=>{
                toast.error(`Failed to update book: ${action.payload}`);
                state.loading = false
            });
        builder
            .addCase(deleteBookData.fulfilled,(state, action)=>{
                toast.success("Book delete successfully!");
                state.books = state.books.filter((book:Book) => book.id !== action.payload.id);
                state.loading = false
                return state
            })
            .addCase(deleteBookData.pending,(state)=>{
                state.loading = true
            })
            .addCase(deleteBookData.rejected,(state, action)=>{
                toast.error(`Failed to delete book: ${action.payload}`);
                state.loading = false
            });
    }
})

export const {saveBook,updateBook,deleteBook}=BookSlice.actions

export default BookSlice.reducer