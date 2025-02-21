import {Order} from "../interface/Order.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState : Order[] = [];

const api = axios.create({
    baseURL : "http://localhost:3000/order"
});

// get All orders
export const getOrdersData = createAsyncThunk(
    'order/getOrder',
    async ()=>{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await api.get('/all');
            return response.data;
        }catch (error) {
            return console.log('error',error)
        }
    }
)
export const updateOrderData = createAsyncThunk(
    'order/updateOrder',
    async ({orderId,status}:{orderId:string,status:"pending" | "complete"})=>{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await api.put('/update/'+orderId,{status:status});
            return response.data;
        }catch (error) {
            return console.log('error',error)
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
                console.log('order get fulfilled')
                state.loading = false
                state.orders = action.payload;
                return state;
            })
            .addCase(getOrdersData.pending,(state,action)=>{
                state.loading = true
            })
            .addCase(getOrdersData.rejected,(state,action)=>{
                console.log("Failed to get order: ",action.payload);
                state.loading = false
            });
        builder
            .addCase(updateOrderData.fulfilled,(state,action)=>{
                console.log('order update fulfilled')
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
                console.log("Failed to update order: ",action.payload);
                state.loading = false
            });
    }
})
export const {updateOrder}=OrderSlice.actions

export default OrderSlice.reducer
