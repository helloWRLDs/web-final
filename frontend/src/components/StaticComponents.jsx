import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";


export const HeaderComponent = () => {
    const {id, isAdmin} = useContext(UserContext)
    const navigator = useNavigate()

    return (
        <header className="border-gray-200 bg-slate-800 text-white mb-9 text-xl">
            <div className="container mx-auto flex items-center">
                <a href="/" className="mr-16">Portf</a>
                <ul className="flex w-auto justify-between">
                    <li><a href={`/users/${id}/portfolio`} className="px-4 py-2 rounded-md hover:bg-slate-600">My Portfolio</a></li>
                    <li><a href={`/`} className="px-4 py-2 rounded-md hover:bg-slate-600">Vacancies</a></li>
                    {isAdmin && 
                        <li><a href="/users" className="px-4 py-2 rounded-md hover:bg-slate-600">Manage users</a></li>
                    }
                </ul>
                {!id ? 
                    <button onClick={() => navigator('/login')} className="ml-auto my-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 active:focus:bg-slate-700 rounded-md" >Login</button>
                    :
                    <a href={`/users/${id}`} className="ml-auto my-2 px-4 py-2 hover:bg-slate-600 active:focus:bg-slate-700 rounded-md">My Account</a>
                }
                
            </div>
        </header>
    )
}

export const FooterComponent = () => {
    return (
        <footer className="absolute bottom-0 h-auto w-full bg-slate-800 text-white">
            <div className="container mx-auto py-8">
                <div className="">
                    Li Danil SE-2213
                </div>
            </div>
        </footer>
    )
}