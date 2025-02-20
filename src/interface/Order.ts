export interface Order {
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