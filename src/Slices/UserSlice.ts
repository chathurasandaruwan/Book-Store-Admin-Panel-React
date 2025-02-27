import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../interface/User.ts";
import axios from "axios";
import {toast} from "react-toastify";


const initialState : User[] = []

const api = axios.create({
    baseURL : "http://localhost:3000/user"
});
// save User
export const saveUserData = createAsyncThunk(
    'user/saveUser',
    async (user : User,{ rejectWithValue })=>{
        //set delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await api.post('/add',user);
            return response.data;
        }catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)
// get All users
export const getUsersData = createAsyncThunk(
    'user/getUser',
    async (_,{ rejectWithValue })=>{
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
// update User
export const updateUserData = createAsyncThunk(
    'user/updateUser',
    async ({ id, user }: { id: string; user: User },{ rejectWithValue }) => {
        //set delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await api.put('/update/'+id,user);
            return response.data;
        }catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)
// delete User
export const deleteUserData = createAsyncThunk(
    'user/deleteUser',
    async (id:string,{ rejectWithValue }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await api.delete('/delete/'+id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)
const UserSlice = createSlice({
    name: "user",
    initialState: {
        users : initialState,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveUserData.fulfilled, (state, action) => {
                toast.success("User added successfully!");
                state.loading = false
                state.users.push(action.payload);
            })
            .addCase(saveUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(saveUserData.rejected, (state, action) => {
                toast.error(`Failed to save User: ${action.payload}`);
                state.loading = false
            })
            .addCase(getUsersData.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload;
                return state;
            })
            .addCase(getUsersData.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsersData.rejected, (state, action) => {
                toast.error(`Failed to get User: ${action.payload}`);
                state.loading = false
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                toast.success("User updated successfully!");
                state.loading = false
                const updateUser = action.payload;
                const index = state.users.findIndex((user) => user.id === updateUser.id);
                if (index !== -1) {
                    state.users[index] = { ...state.users[index], ...updateUser };
                }
            })
            .addCase(updateUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserData.rejected, (state, action) => {
                toast.error(`Failed to update User: ${action.payload}`);
                state.loading = false
            })
            .addCase(deleteUserData.fulfilled, (state, action) => {
                toast.success("User deleted successfully!");
                state.loading = false
                state.users = state.users.filter(user => user.id !== action.payload.id);
                return state
            })
            .addCase(deleteUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUserData.rejected, (state, action) => {
                toast.error(`Failed to delete User: ${action.payload}`);
                state.loading = false
            });
    },
})

export default UserSlice.reducer