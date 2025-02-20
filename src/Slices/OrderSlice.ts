import {Order} from "../interface/Order.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState : Order[] = [
    {
        orderId: "ORD001",
        userId: "USR001",
        orderDate: "2023-05-15",
        status: "pending",
        books: [
            { bookId: "BK001", quantity: 2, price: 29.99 },
            { bookId: "BK002", quantity: 2, price: 29.99 }
        ]
    },
    {
        orderId: "ORD002",
        userId: "USR002",
        orderDate: "2023-05-16",
        status: "complete",
        books: [
            { bookId: "BK003", quantity: 1, price: 19.99 }
        ]
    },
    {
        orderId: "ORD003",
        userId: "USR003",
        orderDate: "2023-05-17",
        status: "pending",
        books: [
            { bookId: "BK002", quantity: 3, price: 39.99 }
        ]
    }
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
