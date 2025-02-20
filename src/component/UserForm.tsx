import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveUserData, updateUserData} from "../Slices/UserSlice.ts";
import {User} from "../interface/User.ts";
import {AppDispatch, RootState} from "../store/Store.ts";

interface UserFormProps {
    userId: string;
    onClose: () => void;
}
export function UserForm({userId, onClose}: UserFormProps) {
    const [formData, setFormData] = useState<User>({
        id:'',
        name: '',
        email: '',
        password: '',
        role: 'user',
        status: 'active',});
    const dispatch = useDispatch<AppDispatch>();
    // Use select to update the form
    const existingUser = useSelector((state:RootState) => state.userData.find((user:User) => user.id === userId));
    useEffect(() => {
        if (existingUser) {
            setFormData(existingUser);
        }
    }, [existingUser]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userId === 'new') {
            // add new user
            dispatch(saveUserData({ ...formData, id: 'newId' }));
        } else {
            // update user
            dispatch(updateUserData({user:formData, id: userId }));
        }
        onClose();
    };
    return (
        <div className="fixed h-screen inset-0 glass-effect flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className=" relative flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {userId === 'new' ? 'Add New User' : 'Edit User'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            value={formData.role}
                            onChange={e => setFormData({...formData, role: e.target.value as 'admin' | 'user'})}
                            className="w-full border rounded p-2"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                            className="w-full border rounded p-2"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 border rounded hover:bg-black hover:text-white hover:cursor-pointer border-2 border-black"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded border-2 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                        >
                            {userId === 'new' ? 'Add User' : 'Update User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}