import { useState } from "react"
import React from "react"

export const UserContext = React.createContext()

export const UserProvider = ({children}) => {
    const initialUserId = localStorage.getItem('id') ?? null
    const [userId, setUserId] = useState(initialUserId)
    const updateUser = (newUser) => {
        setUserId(newUser)
    }
    return (
        <UserContext.Provider value = {{userId, updateUser}}>
            { children }
        </UserContext.Provider>
    )
}