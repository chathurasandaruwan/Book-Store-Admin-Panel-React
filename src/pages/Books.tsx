import {BookForm} from "../component/BookForm.tsx";
import {useEffect, useState} from "react";
import { Pencil, Trash2 } from 'lucide-react';
import {SearchBar} from "../component/SearchBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteBookData, getBooksData} from "../Slices/BookSlice.ts";
import {Book} from "../interface/Book.ts";
import {AppDispatch, RootState} from "../store/Store.ts";
import { toast} from "react-toastify";

export function Books() {
    const [editingBook, setEditingBook] = useState<string | null  >(null);
    const [searchText,setSearchText] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const books:Book[] = useSelector((state:RootState) => state.bookData.books);
    // const loading: boolean = useSelector((state:RootState) => state.bookData.loading);
    useEffect(() => {
        dispatch(getBooksData());
    }, [dispatch]);
    if (searchText !== '') {
        const book = books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()));
        setEditingBook(book[0].id);
        setSearchText('');
    }
    //delete book
    function handleDelete(id: string) {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (confirmDelete) {
            dispatch(deleteBookData(id));
        } else {
            toast.info("Book deletion canceled.");
        }
    }

    return (
        <div className="p-6">
            {/*{loading && <LoadingAnimation/>}*/}
            <div className="flex justify-between items-center mb-6">
                <SearchBar setText={setSearchText}></SearchBar>
                <button
                    onClick={() => setEditingBook('new')}
                    className="bg-black text-white px-4 py-2 rounded border-2 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                >
                    Add New Book
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {books.map(book => (
                    <div key={book.id} className="border rounded-lg p-4 bg-white shadow">
                        <img
                            src={`data:image/jpeg;base64,${book.image}`}
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
                                onClick={()=>handleDelete(book.id)}
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