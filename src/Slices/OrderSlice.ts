import {Order} from "../interface/Order.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";

const initialState : Order[] = [];

const api = axios.create({
    baseURL : "http://localhost:3000/order"
});

// get All orders
export const getOrdersData = createAsyncThunk(
    'order/getOrder',
    async (arg,{ rejectWithValue })=>{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)
export const updateOrderData = createAsyncThunk(
    'order/updateOrder',
    async ({orderId,status}:{orderId:string,status:"pending" | "complete"},{ rejectWithValue })=>{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await api.put('/update/'+orderId,{status:status});
            return response.data;
        }catch (error:any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)

const OrderSlice = createSlice({
    name:"order",
    initialState:{
        orders:initialState,
        loading:false
    },
    reducers:{
        updateOrder:(state,action)=>{const { orderId, status } = action.payload
            const orderToUpdate = state.orders.find((order) => order.id === orderId)
            if (orderToUpdate) {
                orderToUpdate.status = status
            }
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getOrdersData.fulfilled,(state,action)=>{
                state.loading = false
                state.orders = action.payload;
                return state;
            })
            .addCase(getOrdersData.pending,(state,action)=>{
                state.loading = true
            })
            .addCase(getOrdersData.rejected,(state,action)=>{
                toast.error(`Failed to get Orders: ${action.payload}`);
                state.loading = false
            });
        builder
            .addCase(updateOrderData.fulfilled,(state,action)=>{
                toast.success("Order updated successfully!");
                state.loading = false
                const orderToUpdate = state.orders.find((order) => order.id === action.payload.id)
                if (orderToUpdate) {
                    orderToUpdate.status = action.payload.status
                }
            })
            .addCase(updateOrderData.pending,(state,action)=>{
                state.loading = true
            })
            .addCase(updateOrderData.rejected,(state,action)=>{
                toast.error(`Failed to update order: ${action.payload}`);
                state.loading = false
            });
    }
})
export const {updateOrder}=OrderSlice.actions

export default OrderSlice.reducer
