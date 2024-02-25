import React, { useContext, useState } from "react"
import { GoInfo } from "react-icons/go";
import { authenticateUser } from "../api/auth";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const navigator = useNavigate()
    const { updateUser } = useContext(UserContext)
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })

    const submitForm = (e) => {
        e.preventDefault()
        authenticateUser({email, password}).then((id) => {
            if (id) {
                console.log("here")
                updateUser(id)
                navigator(`/users/${id}`)
            }
        })

        // if (validatePassword()) {
            
        // }
    }

    const validateEmail = () => {
        let valid = true
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const errorsCopy = {...errors}
        if (email.trim()) {
            errorsCopy.email = ''
            if (emailRegex.test(email)) {errorsCopy.email = ''}
            else {errorsCopy.email = 'wrong email format'; valid=false;}
        } else {errorsCopy.email = 'email is required'; valid=false;}
        setErrors(errorsCopy)
        return valid
    }

    const validatePassword = () => {
        let valid = validateEmail()
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const errorsCopy = {...errors}
        if (password.trim()) {
            errorsCopy.password = ''
            if (passwordRegex.test(password)) {errorsCopy.password = ''}
            else {errorsCopy.password = 'min 8 symbols(at least 1 let and 1 num)'; valid=false}
        }
        else errorsCopy.password = "password is required"; valid=false;
        setErrors(errorsCopy)
        return valid
    }

    return (
        <div className="mx-auto h-full container">
            <div className="w-1/2 h-3/4 mt-52 mx-auto shadow-2xl bg-slate-100 bg-opacity-10 rounded-2xl">
                <form className="text-center py-7 text-xl">
                    {/* <h2 className="mb-8 text-3xl">Login</h2> */}
                    <label htmlFor="email" className="block">Email:</label>
                    <input type="email" onChange={(e) => setemail(e.target.value)} onBlur={validateEmail} name="email" id="email" className=" px-2 py-1 w-1/3 mb-7 rounded-sm"/>
                        { errors.email &&
                            <p id="email-error" className="relative left-0 -top-7 text-red-500 flex items-center justify-center">
                                <GoInfo className="mr-1"/>{errors.email}
                            </p>
                        }

                    <label htmlFor="password" className="block">Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}  name="password" id="password" className=" px-2 py-1 w-1/3 mb-7 rounded-sm"/>
                        { errors.password &&
                            <p id="password-error" className="relative left-0 -top-7 text-red-500 flex items-center justify-center z-10">
                                <GoInfo className="mr-1"/>{errors.password}
                            </p>
                        }

                    <button onClick={submitForm} className="block w-1/6 mx-auto rounded-md bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white px-5 py-2">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginComponent