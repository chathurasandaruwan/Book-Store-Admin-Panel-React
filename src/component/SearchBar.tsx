import {Search} from "lucide-react";
import {useState} from "react";

interface SearchFormProps {
    setText: (searchText: string) => void;
}
export function SearchBar({setText}:SearchFormProps) {
    const [searchText,setSearchText]= useState('');
    const handelOnClick = () => {
      setText(searchText);
      setSearchText('');
    }
    return (
        <div className="relative w-full max-w-md mb-6">
            <input
                type="text"
                placeholder="Search books..."
                value={searchText}
                className="w-full pl-5 pr-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer" onClick={handelOnClick}>
                <Search className="h-5 w-5 text-gray-400 hover:text-gray-800"/>
            </button>

        </div>
    );
}