import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { getAllUsers } from "../api/userAPI"
import { MdDeleteForever, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { deleteUser } from "../api/userAPI";

const UsersComponent = () => {
    const navigator = useNavigate()
    const [users, setUsers] = useState([])
    const {isAdmin, id} = useContext(UserContext)
    useEffect(() => {
        if (isAdmin) {
            try {
                getAllUsers()
                .then((Response) => {
                    setUsers(Response.data)
                })
            } catch(error) {
                console.error(error)
            }
        } else {
            navigator('/')
        }
        
    }, [])

    return (
        <div className="container mx-auto ">
            <table className="table-auto border-collapse border border-slate-500 w-1/2 mx-auto">
                <thead className="text-left">
                    <tr>
                        <th className="border-slate-500 border px-4 py-2">First Name</th>
                        <th className="border-slate-500 border px-4 py-2">Last Name</th>
                        <th className="border-slate-500 border px-4 py-2">Email</th>
                        <th className="border-slate-500 border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <tr key={user._id} className=" odd:bg-slate-300 even:bg-slate-200">
                            <td className="border-slate-500 border px-4 py-2">{user.firstName}</td>
                            <td className="border-slate-500 border px-4 py-2">{user.lastName}</td>
                            <td className="border-slate-500 border px-4 py-2">{user.email}</td>
                            <td className="border-slate-500 border px-4 py-2 flex w-full justify-between">
                                <button onClick={() => navigator(`/users/${user._id}`)} className="hover:text-slate-500 cursor-pointer"><MdRemoveRedEye className="h-7 w-7"/></button>
                                {(isAdmin || id === user._id) &&
                                    <button onClick={() => navigator(`/users/${user._id}/edit`) } className="hover:text-slate-500 cursor-pointer"><MdEdit className="h-7 w-7"/></button>
                                }
                                {isAdmin && 
                                    <button onClick={() => deleteUser(user._id)} className="hover:text-slate-500 cursor-pointer"><MdDeleteForever className="h-7 w-7"/></button>
                                }
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}

export default UsersComponent