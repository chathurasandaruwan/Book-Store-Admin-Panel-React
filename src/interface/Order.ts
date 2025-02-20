export interface Order {
    /*orderId: string
    userId: string
    bookId: string
    orderDate: string
    quantity: number
    price: number
    status: "pending" | "complete"*/
    id: string;
    user_id: string;
    date: string;
    status: "pending" | "complete";
    books: {
        bookId: string;
        quantity: number;
        price: number;
    }[];
}