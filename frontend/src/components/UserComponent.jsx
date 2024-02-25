import { useEffect, useState } from "react"
import { getUser } from "../api/auth"
import { useParams } from "react-router-dom"

const UserComponent = () => {
    const [user, setUser] = useState({})
    const {id} = useParams()
    useEffect(() => {
        getUser(id).then((result) => {
            setUser(result)
        })
    }, {})
    return (
        <div className="container mx-auto border-l-red-900 border-2">
            {user.firstName}
            {user.lastName}
            {user.email}
        </div>
    )
}

export default UserComponent