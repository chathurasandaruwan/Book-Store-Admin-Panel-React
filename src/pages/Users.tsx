import {useState} from "react";
import {UserForm} from "../component/UserForm.tsx";
import {Pencil, Trash2} from "lucide-react";
import {SearchBar} from "../component/SearchBar.tsx";

export function Users() {
    const [editingUser, setEditingUser] = useState<number | null>(null);
    const [searchText,setSearchText] = useState('');
    console.log(searchText)
    const users = [
        {id:1 , name: 'chathura',email: 'chathura@123', role: 'admin',status: 'active'  }
    ]
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <SearchBar setText={setSearchText}></SearchBar>
                <button
                    onClick={() => setEditingUser(0)}
                    className="bg-black text-white px-4 py-2 border-2 rounded hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                >
                    Add New User
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead>
                    <tr className="border-b">
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Role</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded ${
                      user.role === 'admin' ? 'bg-black text-white' : 'bg-gray-200'
                  }`}>
                    {user.role}
                  </span>
                            </td>
                            <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded ${
                      user.status === 'active' ? 'bg-green-200' : 'bg-red-200'
                  }`}>
                    {user.status}
                  </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setEditingUser(user.id)}
                                        className="p-2 hover:bg-gray-100 rounded hover:text-blue-800 hover:cursor-pointer"
                                    >
                                        <Pencil size={20}/>
                                    </button>
                                    <button
                                        onClick={() => ()=>{
                                            console.log('delete')}}
                                        className="p-2 hover:bg-gray-100 rounded text-red-600 hover:cursor-pointer"
                                    >
                                        <Trash2 size={20}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {editingUser !== null && (
                <UserForm
                    userId={editingUser}
                    onClose={() => setEditingUser(null)}
                />
            )}
        </div>
    );
}