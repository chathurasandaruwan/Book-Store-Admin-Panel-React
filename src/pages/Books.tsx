import {BookForm} from "../component/BookForm.tsx";
import {useState} from "react";
import { Pencil, Trash2 } from 'lucide-react';
import {SearchBar} from "../component/SearchBar.tsx";

export function Books() {
    const [editingBook, setEditingBook] = useState<number | null>(null);
    const [searchText,setSearchText] = useState('');
    console.log(searchText)
    const books = [
        { id: 1, title: 'Book 1', author: 'Author 1', price: 9.99, category: 'Category 1', image: 'src/assets/react.svg' },
        { id: 2, title: 'Book 2', author: 'Author 2', price: 14.99, category: 'Category 2', image: 'src/assets/react.svg' },
    ]

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Books Management</h2>
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
                                onClick={() => {
                                    console.log('delete')}}
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