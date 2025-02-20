import {useEffect, useMemo, useState} from "react";
import {Order} from "../interface/Order.ts";
import {SearchBar} from "../component/SearchBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersData, updateOrder, updateOrderData} from "../Slices/OrderSlice.ts";
import {AppDispatch, RootState} from "../store/Store.ts";

export function Orders() {
    const orders :Order[] = useSelector((state:RootState) => state.orderData)
    const [showPendingOnly, setShowPendingOnly] = useState(false)
    const [searchText,setSearchText] = useState('');

    const dispatch  = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getOrdersData());
    }, [dispatch]);

    const filteredOrders = useMemo(() => {
        return showPendingOnly ? orders.filter((order) => order.status === "pending") : orders
    }, [orders, showPendingOnly])

    const updateOrderStatus = (orderId: string, newStatus: "pending" | "complete") => {
        dispatch(updateOrderData({ orderId, status: newStatus }));
    }
    return (
        <div className="container mx-auto p-4">
            <SearchBar setText={setSearchText}/>
            <div className="mb-4">
                <button
                    onClick={() => setShowPendingOnly(!showPendingOnly)}
                    className={`px-4 py-2 rounded hover:cursor-pointer ${showPendingOnly ? "bg-black border-2 text-white hover:bg-gray-300 hover:text-black" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                >
                    {showPendingOnly ? "Showing Pending Orders" : "Show All Orders"}
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Order ID</th>
                        <th className="px-4 py-2 text-left">User ID</th>
                        <th className="px-4 py-2 text-left">Book Details</th>
                        <th className="px-4 py-2 text-left">Order Date</th>
                        <th className="px-4 py-2 text-left">TOT Quantity</th>
                        <th className="px-4 py-2 text-left">TOT Price</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                            <td className="px-4 py-2">{order.id}</td>
                            <td className="px-4 py-2">{order.user_id}</td>
                            <td className="px-4 py-2">
                                <details className="cursor-pointer">
                                    <summary className="font-semibold text-gray-800">View Books</summary>
                                    <div className="mt-2 p-2 border rounded bg-gray-100">
                                        {order.books.map((book, index) => (
                                            <div key={index} className="mb-2">
                                                <p><strong>Book ID:</strong> {book.bookId}</p>
                                                <p><strong>Quantity:</strong> {book.quantity}</p>
                                                <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            </td>

                            <td className="px-4 py-2">{order.date.toString().split("T")[0]}</td>
                            <td className="px-4 py-2">
                                {order.books.reduce((total, book) => total + book.quantity, 0)}
                            </td>
                            <td className="px-4 py-2">${order.books.reduce((total, book) => total + book.price * book.quantity, 0).toFixed(2)}</td>
                            <td className="px-4 py-2">
                  <span
                      className={`px-2 py-1 rounded ${order.status === "pending" ? "bg-yellow-200" : "bg-green-200"}`}
                  >
                    {order.status}
                  </span>
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() =>
                                        updateOrderStatus(order.id, order.status === "pending" ? "complete" : "pending")
                                    }
                                    className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded hover:cursor-pointer"
                                >
                                    Toggle Status
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}