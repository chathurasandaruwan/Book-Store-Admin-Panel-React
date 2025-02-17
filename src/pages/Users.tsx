import {useState} from "react";
import {UserForm} from "../component/UserForm.tsx";

export function Users() {
    const [isOpen,setIsOpen] = useState(false);
    return (
        <>
            <button onClick={()=>setIsOpen(true)}>click me</button>
            {isOpen && <UserForm userId={0} onClose={()=>setIsOpen(false)}/>}
        </>
    );
}