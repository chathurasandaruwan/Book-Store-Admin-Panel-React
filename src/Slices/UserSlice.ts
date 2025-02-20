import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../interface/User.ts";
import axios from "axios";


const initialState : User[] = []

const api = axios.create({
    baseURL : "http://localhost:3000/user"
});
// save User
export const saveUserData = createAsyncThunk(
    'user/saveUser',
    async (user : User)=>{
        try {
            const response = await api.post('/add',user);
            return response.data;
        }catch (error) {
            return console.log('error',error)
        }
    }
)
// get All users
export const getUsersData = createAsyncThunk(
    'user/getUser',
    async ()=>{
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error) {
            return console.log('error',error)
        }
    }
)
// update User
export const updateUserData = createAsyncThunk(
    'user/updateUser',
    async ({ id, user }: { id: string; user: User }) => {
        try {
            const response = await api.put('/update/'+id,user);
            return response.data;
        }catch (error) {
            return console.log('error',error)
    }   }
)
// delete User
export const deleteUserData = createAsyncThunk(
    'user/deleteUser',
    async (id:string) => {
        try {
            const response = await api.delete('/delete/'+id);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)
const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        saveUser:(state,action)=>{
            state.push(action.payload)
        },
        updateUser:(state, action )=>{
            const updateUser = action.payload
            const index = state.findIndex((user) =>user.id  === updateUser.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...updateUser };
            }
        },
        deleteUser: (state, action) => {
            return state.filter(user => user.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveUserData.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveUserData.pending, (state, action) => {
                console.log("Pending");
            })
            .addCase(saveUserData.rejected, (state, action) => {
                console.log("Failed to save user: ", action.payload);
            })
            .addCase(getUsersData.fulfilled, (state, action) => {
                state = action.payload;
                return state;
            })
            .addCase(getUsersData.pending, (state, action) => {
                console.log("Pending");
            })
            .addCase(getUsersData.rejected, (state, action) => {
                console.log("Failed to get user: ", action.payload);
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                const updateUser = action.payload;
                const index = state.findIndex((user) => user.id === updateUser.id);
                if (index !== -1) {
                    state[index] = { ...state[index], ...updateUser };
                }
            })
            .addCase(deleteUserData.fulfilled, (state, action) => {
                return state.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUserData.pending, (state, action) => {
                console.log("Pending");
            })
            .addCase(deleteUserData.rejected, (state, action) => {
                console.log("Failed to delete user: ", action.payload);
            });
    },
})

export const {saveUser,updateUser,deleteUser}=UserSlice.actions

export default UserSlice.reducer