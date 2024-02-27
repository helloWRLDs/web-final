import { useState } from "react"
import React from "react"

export const UserContext = React.createContext()

export const UserProvider = ({children}) => {
    const [id, setId] = useState(localStorage.getItem('id') ?? null)
    const [token, setToken] = useState(localStorage.getItem('token') ?? null)
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') ?? false)
    const updateId = (id) => {
        localStorage.removeItem('id')
        localStorage.setItem('id', id)
        setId(id)
    }
    const updateToken = (token) => {
        localStorage.removeItem('token')
        localStorage.setItem('token', token)
        setToken(token)
    }
    const updateAdmin = (isAdmin) => {
        localStorage.removeItem('isAdmin')
        localStorage.setItem('isAdmin', isAdmin)
        setIsAdmin(isAdmin)
    }
    const cleanSession = () => {
        localStorage.clear()
        setToken(null)
        setId(null)
        setIsAdmin(false)
    }
    return (
        <UserContext.Provider value = {{id, updateId, token, updateToken, isAdmin, updateAdmin, cleanSession}}>
            { children }
        </UserContext.Provider>
    )
}