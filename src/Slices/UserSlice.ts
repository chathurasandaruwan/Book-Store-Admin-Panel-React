import {createSlice} from "@reduxjs/toolkit";
import {User} from "../interface/User.ts";


const initialState : User[] = []

const UserSlice = createSlice({
    name: "book",
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
        deleteUser:(state, action )=>{
            const index = action.payload
            if (index !== -1) {
                state.splice(index, 1);
            }
        },

    }
})

export const {saveUser,updateUser,deleteUser}=UserSlice.actions

export default UserSlice.reducer