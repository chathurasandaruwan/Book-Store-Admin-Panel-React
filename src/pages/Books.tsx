import {BookForm} from "../component/BookForm.tsx";
import {useState} from "react";

export function Books() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(true)}>click</button>
            {isOpen && <BookForm onClose={() => setIsOpen(false)} bookId={0}/>}
        </>
    );
}