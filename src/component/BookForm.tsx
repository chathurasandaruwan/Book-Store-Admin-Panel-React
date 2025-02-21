import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addBookData, updateBookData} from "../Slices/BookSlice.ts";
import {Book} from "../interface/Book.ts";
import {AppDispatch, RootState} from "../store/Store.ts";


interface BookFormProps {
    bookId: string;
    onClose: () => void;
}

export function BookForm({bookId, onClose}: BookFormProps) {
    const [formData, setFormData] = useState<Book>({id:'',title: '', author: '', price: 0, description: '', category: '', image: '', stock: 0});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [tempImgUrl,setTempImgUrl] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const existingBook = useSelector((state:RootState) => state.bookData.books.find((book:Book) => book.id === bookId));
//load update form
    useEffect(() => {
        if (existingBook) {
            setFormData(existingBook);
            const base64Image = existingBook.image.split(',')[1]
            setTempImgUrl(base64Image)
        }
    }, [existingBook]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //save book
        if (bookId === 'new') {
            dispatch(addBookData({...formData, id:'newId'}));
        } else {
            //update book
            if (formData.image === '') {
                setFormData(prevData => ({ ...prevData, image: tempImgUrl }));
            }
            dispatch(updateBookData({book:formData, id: bookId }));
        }
        onClose();
    };
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
            {/*{loading && <LoadingAnimation/>}*/}
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
                       {/* <input
                            type="text"
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                            className="w-full border rounded p-2"
                            required
                        />*/}
                        <select
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                            className="w-full border rounded p-2"
                            required
                        >
                            <option value="" hidden disabled>Select Category</option>
                            <option value="Educational & Academic">Educational & Academic</option>
                            <option value="Children's Books">Children's Books</option>
                            <option value="History & Archaeology">History & Archaeology</option>
                            <option value="Science & Technology">Science & Technology</option>
                            <option value="Biographies & Memoirs">Biographies & Memoirs</option>
                            <option value="Business & Economics">Business & Economics</option>
                            <option value="Health & Wellness">Health & Wellness</option>
                            <option value="Art & Photography">Art & Photography</option>
                            <option value="Travel & Adventure">Travel & Adventure</option>
                            <option value="Law & Politics">Law & Politics</option>
                            <option value="Cookbooks & Food">Cookbooks & Food</option>
                            <option value="Sports & Fitness">Sports & Fitness</option>
                            <option value="Comics & Graphic Novels">Comics & Graphic Novels</option>
                            <option value="Magazines & Journals">Magazines & Journals</option>
                            <option value="Fiction">Fiction</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        {/*{formData.image && <img id="previewImage" className="w-full h-48 object-cover rounded mb-4" src={formData.image} alt="Preview"/>}*/}
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full border rounded p-2"
                            ref={fileInputRef}
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