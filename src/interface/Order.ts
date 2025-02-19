export interface Order {
    orderId: string
    userId: string
    bookId: string
    orderDate: string
    quantity: number
    price: number
    status: "pending" | "complete"
}