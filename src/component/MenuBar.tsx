import {useState} from "react";
import { LayoutDashboard, BookOpen, Users, Menu, X } from 'lucide-react';


export function MenuBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/books', icon: BookOpen, label: 'Books' },
        { path: '/users', icon: Users, label: 'Users' },
    ];

    return (
        <>
            {/* Toggle Sidebar Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-black text-white transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold max-lg:pt-15">Admin Panel</h1>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item) => (
                            <a
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-800"
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-800">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>© 2024 Admin Panel</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}