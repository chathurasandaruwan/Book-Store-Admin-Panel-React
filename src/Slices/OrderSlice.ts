import {Order} from "../interface/Order.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState : Order[] = [
    {
        orderId: "ORD001",
        userId: "USR001",
        bookId: "BK001",
        orderDate: "2023-05-15",
        quantity: 2,
        price: 29.99,
        status: "pending",
    },
    {
        orderId: "ORD002",
        userId: "USR002",
        bookId: "BK003",
        orderDate: "2023-05-16",
        quantity: 1,
        price: 19.99,
        status: "complete",
    },
    {
        orderId: "ORD003",
        userId: "USR003",
        bookId: "BK002",
        orderDate: "2023-05-17",
        quantity: 3,
        price: 39.99,
        status: "pending",
    },
];

const OrderSlice = createSlice({
    name:"order",
    initialState:initialState,
    reducers:{
        updateOrder:(state,action)=>{const { orderId, status } = action.payload
            const orderToUpdate = state.find((order) => order.orderId === orderId)
            if (orderToUpdate) {
                orderToUpdate.status = status
            }
        }
    }
})
export const {updateOrder}=OrderSlice.actions

export default OrderSlice.reducer
