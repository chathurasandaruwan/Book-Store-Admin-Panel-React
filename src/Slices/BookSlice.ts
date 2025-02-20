import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Book} from "../interface/Book.ts";
import axios from "axios";

const initialState : Book[] = [];

const api = axios.create({
    baseURL : "http://localhost:3000/book"
});
// connect with database
//save book
export const addBookData = createAsyncThunk(
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
export const getBooksData = createAsyncThunk(
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
//update book
export const updateBookData = createAsyncThunk(
    'book/updateBook',
    async ({ id, book }: { id: string; book: Book }) => {
        try {
            const response = await api.put('/update/'+id, book);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);
//delete book
export const deleteBookData = createAsyncThunk(
    'book/deleteBook',
    async (id:string) => {
        try {
            const response = await api.delete('/delete/'+id);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);
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
            .addCase(addBookData.fulfilled,(state, action)=>{
                state.push(action.payload)
                console.log("book save fulfilled")
            })
            .addCase(addBookData.pending,(state, action)=>{
                console.log("Pending");
            })
            .addCase(addBookData.rejected,(state, action)=>{
                console.log("Failed to save book: ",action.payload);
            });
        builder
            .addCase(getBooksData.fulfilled,(state, action)=>{
                console.log("books get fulfilled");
                state = action.payload;
                return state;
            })
            .addCase(getBooksData.pending,(state, action)=>{
                console.log("Pending");
            })
            .addCase(getBooksData.rejected,(state, action)=>{
                console.log("Failed to get book: ",action.payload);
            });
        builder
            .addCase(updateBookData.fulfilled,(state, action)=>{
                console.log("book update fulfilled")
                return state.map((book:Book)=>(
                    book.id==action.payload.id ? {...book,title : action.payload.title, author : action.payload.author,price:action.payload.price,description:action.payload.description,
                        category:action.payload.category,image:action.payload.image,stock:action.payload.stock} : book
                ))
            })
            .addCase(updateBookData.pending,(state, action)=>{
                console.log("Pending");
            })
            .addCase(updateBookData.rejected,(state, action)=>{
                console.log("Failed to update book: ",action.payload);
            });
        builder
            .addCase(deleteBookData.fulfilled,(state, action)=>{
                console.log("fulfilled");
                state = state.filter((book:Book) => book.id !== action.payload.id);
                return state
            })
            .addCase(deleteBookData.pending,(state, action)=>{
                console.log("Pending");
            })
            .addCase(deleteBookData.rejected,(state, action)=>{
                console.log("Failed to delete book: ",action.payload);
            });
    }
})

export const {saveBook,updateBook,deleteBook}=BookSlice.actions

export default BookSlice.reducer