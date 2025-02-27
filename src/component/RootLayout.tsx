import { Outlet } from "react-router"
import { useLocation } from "react-router"
import {MenuBar} from "./MenuBar.tsx";
import { ToastContainer } from "react-toastify";
import {LoadingAnimation} from "./LoadingAnimation.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store.ts";
import {useEffect, useState} from "react";

export function RootLayout() {
    const [loading,setLoading] = useState(false);
    const location = useLocation()
    const isLoadingBook: boolean = useSelector((state:RootState) => state.bookData.loading);
    const isLoadingUser: boolean = useSelector((state:RootState) => state.userData.loading);
    const isLoadingOrder: boolean = useSelector((state:RootState) => state.orderData.loading);

    useEffect(() => {
        setLoading(isLoadingBook || isLoadingUser || isLoadingOrder);
    }, [isLoadingBook, isLoadingUser, isLoadingOrder]);

    const routeTitles: any = {
        "/dashboard": "Dashboard",
        "/books": "Books Management",
        "/users": "Users Management",
        "/orders": "Order Details",
    }

    const title = routeTitles[location?.pathname] || "Shop"

    return (
        <div className="flex min-h-screen bg-gray-100">
            <MenuBar/>
            <div className="flex-1 flex flex-col transition-all duration-300">
                <header className="bg-black text-white p-4 max-lg:px-18 flex items-center">
                    <h1 className="text-xl font-semibold">{title}</h1>
                </header>
                <main className="p-4 flex-1">
                    <ToastContainer />
                    {loading && <LoadingAnimation/>}
                    <Outlet />
                </main>
            </div>
        </div>
    )
}