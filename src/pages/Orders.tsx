import {useMemo, useState} from "react";
import {Order} from "../interface/Order.ts";

const initialOrders: Order[] = [
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
]
export function Orders() {
    const [orders, setOrders] = useState<Order[]>(initialOrders)
    const [showPendingOnly, setShowPendingOnly] = useState(false)

    const filteredOrders = useMemo(() => {
        return showPendingOnly ? orders.filter((order) => order.status === "pending") : orders
    }, [orders, showPendingOnly])

    const updateOrderStatus = (orderId: string, newStatus: "pending" | "complete") => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order.orderId === orderId ? { ...order, status: newStatus } : order)),
        )
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order Management</h1>
            <div className="mb-4">
                <button
                    onClick={() => setShowPendingOnly(!showPendingOnly)}
                    className={`px-4 py-2 rounded ${showPendingOnly ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
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
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
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