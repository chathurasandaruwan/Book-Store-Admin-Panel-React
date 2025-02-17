import React,{useState} from "react";

interface UserFormProps {
    userId: number;
    onClose: () => void;
}
export function UserForm({userId, onClose}: UserFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user',
        status: 'active',});
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userId === 0) {
            // add new user
            console.log()
        } else {
            // update user
            console.log()
        }
        onClose();
    };
    return (
        <div className="fixed h-screen inset-0 glass-effect flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className=" relative flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {userId === 0 ? 'Add New User' : 'Edit User'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/*<form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Author</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={e => setFormData({...formData, author: e.target.value})}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            className="w-full border rounded p-2"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            type="file"
                            value={formData.image}
                            onChange={e => setFormData({...formData, image: e.target.value})}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Stock</label>
                        <input
                            type="number"
                            value={formData.stock}
                            onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-black hover:text-white hover:cursor-pointer border-2 border-black"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded border-2 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                        >
                            {userId === 0 ? 'Add User' : 'Update User'}
                        </button>
                    </div>
                </form>*/}
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
                            {userId === 0 ? 'Add User' : 'Update User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}