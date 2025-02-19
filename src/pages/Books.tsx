import {BookForm} from "../component/BookForm.tsx";
import {useState} from "react";
import { Pencil, Trash2 } from 'lucide-react';
import {SearchBar} from "../component/SearchBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteBook} from "../Slices/BookSlice.ts";
import {Book} from "../interface/Book.ts";
import {RootState} from "../store/Store.ts";

export function Books() {
    const [editingBook, setEditingBook] = useState<number | null>(null);
    const [searchText,setSearchText] = useState('');
    const dispatch = useDispatch();
    const books:Book[] = useSelector((state:RootState) => state.bookData);


    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <SearchBar setText={setSearchText}></SearchBar>
                <button
                    onClick={() => setEditingBook(0)}
                    className="bg-black text-white px-4 py-2 rounded border-2 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                >
                    Add New Book
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {books.map(book => (
                    <div key={book.id} className="border rounded-lg p-4 bg-white shadow">
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                        <p className="text-gray-600 mb-2">By {book.author}</p>
                        <p className="text-lg font-bold mb-2">${book.price}</p>
                        <p className="text-sm text-gray-500 mb-4">{book.category}</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingBook(book.id)}
                                className="p-2 hover:bg-gray-100 rounded hover:text-blue-800 hover:cursor-pointer"
                            >
                                <Pencil size={20}/>
                            </button>
                            <button
                                onClick={() => dispatch(deleteBook(book.id))}
                                className="p-2 hover:bg-gray-100 rounded text-red-600 hover:cursor-pointer"
                            >
                                <Trash2 size={20}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editingBook !== null && (
                <BookForm
                    bookId={editingBook}
                    onClose={() => setEditingBook(null)}
                />
            )}
        </div>
    );
}