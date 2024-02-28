import { useContext, useEffect, useState } from "react"
import { getUser } from "../api/userAPI"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { getAllUsers } from "../api/userAPI"
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const UserComponent = () => {
    const {cleanSession, isAdmin} = useContext(UserContext)
    const [user, setUser] = useState({})
    const {id} = useParams()
    const navigator = useNavigate()
    const emailLink = `mailto:${user.email}`
    //funcs
    const logOut = (e) => {
        e.preventDefault()
        cleanSession()
        navigator('/login')
    }

    const edit = (e) => {
        e.preventDefault()
        navigator(`/${user.id}/edit`)
    }

    useEffect(() => {
        try {
            getUser(id).then((Response) => {
                setUser(Response.data)
            })
        } catch(error) {
            console.error(error)
        }
    }, [])
    return (
        <section>
            <div className="container mx-auto">
                <div className="mx-auto relative w-1/2 bg-slate-300 flex rounded-2xl h-auto mt-24">
                    <div className="absolute w-32 -top-12 right-1/2 translate-x-16">
                        {user.git && user.git.avatar_url ?
                            <img src={user.git.avatar_url} alt="avatar" className="rounded-full w-full"/>
                            :
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhsJ2D692LXEDT04mefdqZtznqnIg31FnmX5-aETP1O-rA40rRhSYbMrmMTfTVHHwoCk&usqp=CAU" alt="avatar" className="rounded-full w-full"/>
                        }
                    </div>
                    <div className="mx-auto text-center w-full px-5 py-5">
                        <div className="flex justify-between mb-12">
                            <a href={user.git && user.git.link ? user.git.link : 'https://github.com'}><FaGithub className="w-9 h-9 hover:text-slate-500 active:text-slate-600"/></a>
                            <a href={emailLink}><SiGmail className="w-9 h-9 hover:text-slate-500 active:text-slate-600"/></a>
                        </div>
                        <p className="capitalize font-bold text-2xl">{user.firstName} {user.lastName}</p>
                        <p className="capitalize font-medium">{user.country}</p>
                        <p>{ user.age } years old</p>
                        <p className="capitalize">{ user.gender }</p>
                        { user.isAdmin ? 
                            <p>Admin</p>
                            :
                            <p>Regular User</p>
                        }
                        {localStorage.getItem('id') === user._id &&
                            <button onClick={edit} className="w-1/5 mx-auto bg-blue-600 hover:bg-blue-500 active:bg-blue-700 block text-white px-5 py-2 rounded-md">Edit</button>
                        }
                        {localStorage.getItem('id') === user._id &&
                            <button onClick={logOut} className="w-1/5 mx-auto bg-red-600 hover:bg-red-500 active:bg-red-700 block text-white px-5 py-2 rounded-md">Log out</button>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserComponent