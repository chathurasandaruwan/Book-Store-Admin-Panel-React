import { BookOpen, Users, DollarSign, Package } from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import {Book} from "../interface/Book.ts";
import {User} from "../interface/User.ts";
import {AppDispatch, RootState} from "../store/Store.ts";
import {useEffect} from "react";
import {getUsersData} from "../Slices/UserSlice.ts";
import {getBooksData} from "../Slices/BookSlice.ts";

export function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUsersData());
        dispatch(getBooksData());
    }, [dispatch]);
    const books:Book[] = useSelector((state:RootState) => state.bookData);
    const users:User[] = useSelector((state:RootState) => state.userData);

    const totalBooks = books.length;
    const totalUsers = users.length;
    const totalValue = books.reduce((sum, book) => sum + book.price * book.stock, 0);
    const outOfStock = books.filter(book => book.stock === 0).length;
    const stats = [
        {
            title: 'Total Books',
            value: totalBooks,
            icon: BookOpen,
            color: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Total Users',
            value: totalUsers,
            icon: Users,
            color: 'bg-green-50',
            iconColor: 'text-green-600',
        },
        {
            title: 'Inventory Value',
            value: `$${totalValue.toFixed(2)}`,
            icon: DollarSign,
            color: 'bg-yellow-50',
            iconColor: 'text-yellow-600',
        },
        {
            title: 'Out of Stock',
            value: outOfStock,
            icon: Package,
            color: 'bg-red-50',
            iconColor: 'text-red-600',
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            {/*stat cart set*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.color} rounded-lg p-6 transition-transform hover:scale-105`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">{stat.title}</p>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            </div>
                            <div className={`${stat.iconColor} p-3 rounded-full bg-white`}>
                                <stat.icon size={24}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/*show book category*/}
                <div className="bg-white rounded-lg p-6 shadow h-[400px] flex flex-col">
                    <h3 className="text-lg font-semibold mb-4">Book Categories</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                        {Object.entries(
                            books.reduce((acc, book) => {
                                acc[book.category] = (acc[book.category] || 0) + 1;
                                return acc;
                            }, {} as Record<string, number>)
                        ).map(([category, count]) => (
                            <div
                                key={category}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-gray-600">{category}</span>
                                <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                                    {count} books
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/*user detail*/}
                <div className="bg-white rounded-lg p-6 shadow h-[400px] flex flex-col">
                    <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Admin Users</span>
                            <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                                {users.filter(user => user.role === 'admin').length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Regular Users</span>
                            <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                                {users.filter(user => user.role === 'user').length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Active Users</span>
                            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                                {users.filter(user => user.status === 'active').length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Inactive Users</span>
                            <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm">
                                {users.filter(user => user.status === 'inactive').length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}