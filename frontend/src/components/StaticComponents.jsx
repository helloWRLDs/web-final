import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";


export const HeaderComponent = () => {
    const {userId} = useContext(UserContext)
    const navigator = useNavigate()
    const loginPage = (e) => {e.preventDefault(); navigator('/login')}

    return (
        <header className="border-gray-200 bg-cyan-800 text-white">
            <div className="container mx-auto flex items-center justify-between">
                <a href="/" className="">Portf</a>
                <ul className="flex w-1/4 justify-between">
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                </ul>
                {!userId ? 
                    <button onClick={loginPage} className="my-2 px-4 py-2 bg-cyan-700 hover:bg-cyan-600 active:focus:bg-cyan-700 rounded-md" >Login</button>
                    :
                    <a href={`/users/${userId}`} className="my-2 px-4 py-2 hover:bg-cyan-600 active:focus:bg-cyan-700 rounded-md">My Account</a>
                }
                
            </div>
        </header>
    )
}

export const FooterComponent = () => {
    return (
        <footer className="h-12 bg-cyan-800">
            <div className="container mx-auto">
                footer
            </div>
        </footer>
    )
}