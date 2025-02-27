import React, {useState} from "react";
import {User} from "../interface/User.ts";

export function SignInForm() {
    const [signInData, setSignInData] = useState({email: "", password: ""})

    const handleChangeSignIn = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setSignInData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const handleSubmitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user:User = {email: signInData.email, password: signInData.password , role: "admin"}
        // dispatch(loginUser(user));
        setSignInData({email: "", password: ""})
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl h-[600px] w-full">
                <h2 className="mb-6 text-3xl font-bold text-gray-800">Sign In</h2>
                <form className="space-y-4 p-6 pt-18" onSubmit={handleSubmitSignIn}>
                    <div>
                        <label htmlFor="signin-email" className='block text-sm font-medium text-gray-700'>Email</label>
                        <input id="signin-email" name="email" value={signInData.email} type="email"
                               placeholder="Enter your email"
                               className='mt-1 w-full p-2 border border-gray-400 rounded-lg' required
                               onChange={handleChangeSignIn}/>
                    </div>
                    <div>
                        <label htmlFor="signin-password"
                               className='block text-sm font-medium text-gray-700'>Password</label>
                        <input id="signin-password" name="password" value={signInData.password} type="password"
                               placeholder="Enter your password"
                               className='mt-1 w-full p-2 border border-gray-400 rounded-lg' required
                               onChange={handleChangeSignIn}/>
                    </div>
                    <button
                        className="w-full bg-black border-2 border-black text-white rounded px-10 py-2 mt-4 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                        type="submit">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}