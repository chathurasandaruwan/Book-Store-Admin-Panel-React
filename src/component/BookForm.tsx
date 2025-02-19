import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addBookData, saveBook, updateBook, updateBookData} from "../Slices/BookSlice.ts";
import {Book} from "../interface/Book.ts";
import {AppDispatch, RootState} from "../store/Store.ts";


interface BookFormProps {
    bookId: string;
    onClose: () => void;
}

export function BookForm({bookId, onClose}: BookFormProps) {
    const [formData, setFormData] = useState<Book>({id:'',title: '', author: '', price: 0, description: '', category: '', image: '', stock: 0});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const existingBook = useSelector((state:RootState) => state.bookData.find((book:Book) => book.id === bookId));
//load update form
    useEffect(() => {
        if (existingBook) {
            setFormData(existingBook);
        }
    }, [existingBook]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //save book
        if (bookId === 'new') {
            dispatch(addBookData({...formData, id:'newId'}));
        } else {
            //update book
            dispatch(updateBookData({book:formData, id: bookId }));
        }
        onClose();
    };
    /*const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setFormData({ ...formData, image: reader.result as string });
                }
            };
            reader.readAsDataURL(file);
        }
    };*/
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    const base64String = reader.result.toString().split(",")[1]; // Extract Base64
                    setFormData({ ...formData, image: base64String });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed h-screen inset-0 glass-effect flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="relative flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {bookId === 'new' ? 'Add New Book' : 'Edit Book'}
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
                        {/*{formData.image && <img id="previewImage" className="w-full h-48 object-cover rounded mb-4" src={formData.image} alt="Preview"/>}*/}
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full border rounded p-2"
                            ref={fileInputRef}
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
                            className="px-4 py-2 border bg-gray-300 rounded hover:bg-black hover:text-white hover:cursor-pointer border-2 border-black"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded border-2 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                        >
                            {bookId === 'new' ? 'Add Book' : 'Update Book'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}