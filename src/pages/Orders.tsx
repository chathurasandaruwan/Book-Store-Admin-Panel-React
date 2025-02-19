import {useMemo, useState} from "react";
import {Order} from "../interface/Order.ts";
import {SearchBar} from "../component/SearchBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {updateOrder} from "../Slices/OrderSlice.ts";

export function Orders() {
    const orders :Order[] = useSelector(state => state.orderData)
    const dispatch = useDispatch();
    const [showPendingOnly, setShowPendingOnly] = useState(false)
    const [searchText,setSearchText] = useState('');

    const filteredOrders = useMemo(() => {
        return showPendingOnly ? orders.filter((order) => order.status === "pending") : orders
    }, [orders, showPendingOnly])

    const updateOrderStatus = (orderId: string, newStatus: "pending" | "complete") => {
        dispatch(updateOrder({ orderId, status: newStatus }));
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
                        <th className="px-4 py-2 text-left">Book ID</th>
                        <th className="px-4 py-2 text-left">Order Date</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.orderId} className="border-b">
                            <td className="px-4 py-2">{order.orderId}</td>
                            <td className="px-4 py-2">{order.userId}</td>
                            <td className="px-4 py-2">{order.bookId}</td>
                            <td className="px-4 py-2">{order.orderDate}</td>
                            <td className="px-4 py-2">{order.quantity}</td>
                            <td className="px-4 py-2">${order.price.toFixed(2)}</td>
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
                                        updateOrderStatus(order.orderId, order.status === "pending" ? "complete" : "pending")
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