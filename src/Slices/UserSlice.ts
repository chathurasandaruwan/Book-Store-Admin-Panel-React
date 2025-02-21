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
    async (user : User,{ rejectWithValue })=>{
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
    async (arg,{ rejectWithValue })=>{
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
    async ({ id, user }: { id: string; user: User },{ rejectWithValue }) => {
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
    async (id:string,{ rejectWithValue }) => {
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
    initialState: {
        users : initialState,
        loading: false,
    },
    reducers: {
        saveUser:(state,action)=>{
            state.users.push(action.payload)
        },
        updateUser:(state, action )=>{
            const updateUser = action.payload
            const index = state.users.findIndex((user) =>user.id  === updateUser.id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...updateUser };
            }
        },
        deleteUser: (state, action) => {
            state.users.filter(user => user.id !== action.payload);
            return state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveUserData.fulfilled, (state, action) => {
                console.log('user save fulfilled')
                state.loading = false
                state.users.push(action.payload);
            })
            .addCase(saveUserData.pending, (state, action) => {
                state.loading = true
            })
            .addCase(saveUserData.rejected, (state, action) => {
                console.log("Failed to save user: ", action.payload);
                state.loading = false
            })
            .addCase(getUsersData.fulfilled, (state, action) => {
                console.log('user get fulfilled')
                state.loading = false
                state.users = action.payload;
                return state;
            })
            .addCase(getUsersData.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getUsersData.rejected, (state, action) => {
                console.log("Failed to get user: ", action.payload);
                state.loading = false
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                console.log('user update fulfilled')
                state.loading = false
                const updateUser = action.payload;
                const index = state.users.findIndex((user) => user.id === updateUser.id);
                if (index !== -1) {
                    state.users[index] = { ...state.users[index], ...updateUser };
                }
            })
            .addCase(updateUserData.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateUserData.rejected, (state, action) => {
                console.log("Failed to update user: ", action.payload);
                state.loading = false
            })
            .addCase(deleteUserData.fulfilled, (state, action) => {
                console.log('user delete fulfilled')
                state.loading = false
                state.users = state.users.filter(user => user.id !== action.payload.id);
                return state
            })
            .addCase(deleteUserData.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteUserData.rejected, (state, action) => {
                console.log("Failed to delete user: ", action.payload);
                state.loading = false
            });
    },
})

export const {saveUser,updateUser,deleteUser}=UserSlice.actions

export default UserSlice.reducer