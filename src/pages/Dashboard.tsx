import { BookOpen, Users, DollarSign, Package } from 'lucide-react';
import {useSelector} from "react-redux";
import {Book} from "../interface/Book.ts";
import {User} from "../interface/User.ts";

export function Dashboard() {
    /*const books = [
        { id: 1, title: 'Book 1', author: 'Author 1', price: 9.99, category: 'Category 1', image: 'src/assets/react.svg', stock: 0 },
        { id: 2, title: 'Book 2', author: 'Author 2', price: 14.99, category: 'Category 2', image: 'src/assets/react.svg',stock:2 },
        { id: 3, title: 'Book 3', author: 'Author 3', price: 15.99, category: 'Category 3', image: 'src/assets/react.svg',stock:0 },
        { id: 4, title: 'Book 4', author: 'Author 4', price: 16.99, category: 'Category 4', image: 'src/assets/react.svg',stock:21 },
        { id: 5, title: 'Book 5', author: 'Author 5', price: 17.99, category: 'Category 5', image: 'src/assets/react.svg',stock:24 },
        { id: 6, title: 'Book 6', author: 'Author 6', price: 18.99, category: 'Category 6', image: 'src/assets/react.svg',stock:20 },
    ];
    const users = [
        {id:1 , name: 'chathura',email: 'chathura@123', role: 'admin',status: 'active'  }
    ]*/
    const books:Book[] = useSelector(state => state.bookData);
    const users:User[] = useSelector(state => state.userData);

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