export interface Order {
    /*orderId: string
    userId: string
    bookId: string
    orderDate: string
    quantity: number
    price: number
    status: "pending" | "complete"*/
    orderId: string;
    userId: string;
    orderDate: string;
    status: "pending" | "complete";
    books: {
        bookId: string;
        quantity: number;
        price: number;
    }[];
}