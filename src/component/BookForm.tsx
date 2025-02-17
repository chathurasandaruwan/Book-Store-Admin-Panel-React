import React,{useState} from "react";

interface BookFormProps {
    bookId: number;
    onClose: () => void;
}
export function BookForm({bookId, onClose}: BookFormProps) {
    const [formData, setFormData] = useState({title: '', author: '', price: 0, description: '', category: '', image: '', stock: 0});
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (bookId === 0) {
            console.log()
        } else {
            console.log()
        }
        onClose();
    };
    return (
        <div className="fixed h-screen inset-0 glass-effect flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className=" relative flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {bookId === 0 ? 'Add New Book' : 'Edit Book'}
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
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                        >
                            {bookId === 0 ? 'Add Book' : 'Update Book'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}