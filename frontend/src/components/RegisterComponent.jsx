import { useContext, useEffect, useState } from "react"
import { GoInfo } from "react-icons/go";
import { IoMailSharp } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlinePassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CgMenuMotion } from "react-icons/cg";
import { registerUser } from "../api/userAPI"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const RegisterComponent = () => {
    const navigator = useNavigate()

    const {token, id} = useContext(UserContext)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [age, setAge] = useState(null)
    const [country, setCountry] = useState('')
    const [gender, setGender] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (token || id) {
            navigator('/')
        }
    }, [])


    //funcs
    const submitForm = (e) => {
        e.preventDefault()
        const newUser = {
            firstName: firstName,
            lastName: lastName, 
            email: email, 
            password: password,
            age: parseInt(age),
            country: country,
            gender: gender,
        }
        registerUser(newUser)
            .then((Response) => {
                if (Response.status === 200) {
                    navigator('/login')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        let valid = true
        if (password != repeatPassword) {
            setError("Password doesn't match")
            valid = false
        }
        if (!emailRegex.test(email)) {
            setError("Wrong email input")
            valid = false
        } else {
            setError("")
            if (!passwordRegex.test(password)) {
                valid = false
                setError('Wrong password input')
            }
        }
        return valid;
    }

    return (
        <section className="">
            <div className="container mx-auto">
                <form className="text-center mx-auto w-1/6 mb-0 mt-32">
                    <label htmlFor="firstName" className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
                        <FaUser className="pointer-events-none w-5 h-5 translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-1"/>
                        <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)} onBlur={(e) => setError(e.target.value ? "" : "First name is required")} required id="firstName" placeholder="John" className="form-input w-full pl-10 py-2 rounded-sm"/>
                    </label>

                    <label htmlFor="lastName" className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
                        <FaUser className="pointer-events-none w-5 h-5 translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-1"/>
                        <input type="text" name="lastName" onChange={(e) => {setLastName(e.target.value)}} onBlur={(e) => setError(e.target.value ? "" : "Last name is required")} required id="lastName" placeholder="Doe" className="form-input w-full pl-10 py-2 rounded-sm"/>
                    </label>

                    <label htmlFor="email" className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
                        <IoMailSharp className="pointer-events-none w-5 h-5 translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-1"/>
                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} onBlur={(e) => setError(e.target.value ? "" : "Email is required")} id="email" required placeholder="example@gmail.com" className="form-input w-full pl-10 py-2 rounded-sm"/>
                    </label>

                    <label htmlFor="country" className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
                        <FaMapLocationDot className="pointer-events-none w-5 h-5 translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-1"/>
                        <input type="text" name="country" onChange={(e) => setCountry(e.target.value)} required id="country" placeholder="Germany" className="form-input w-full pl-10 py-2 rounded-sm"/>
                    </label>

                    <label htmlFor="age" className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
                        <CgMenuMotion className="pointer-events-none w-5 h-5 translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-1"/>
                        <input type="number" name="age" onChange={(e) => setAge(e.target.value)} required id="age" placeholder="19" min={0} max={99} className="form-input w-full pl-10 py-2 rounded-sm"/>
                    </label>

                    <label htmlFor="password" className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
                        <MdOutlinePassword className="pointer-events-none w-5 h-5 translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-1"/>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} onBlur={(e) => setError(e.target.value ? "" : "Email is required")} required id="password" placeholder="Password" className="form-input w-full pl-10 py-2 rounded-sm"/>
                    </label>

                    <label htmlFor="repeatPassword" className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
                        <MdOutlinePassword className="pointer-events-none w-5 h-5 translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-1"/>
                        <input type="password" name="repeatPassword" onChange={(e) => setRepeatPassword(e.target.value)} onBlur={validate} required id="repeatPassword" placeholder="Repeat password" className="form-input w-full pl-10 py-2 rounded-sm"/>
                    </label>

                    <ul className="w-full text-left text-gray-500 bg-white border border-gray-200 rounded-sm mb-2">
                        <li className="w-full border-b border-gray-200 rounded-t-lg">
                            <div className="flex items-center ps-3">
                                <input id="male" type="radio" onClick={(e) => setGender(e.target.value)} value="male" name="gender" className="w-4 h-4 text-gray-400  focus:ring-gray-600 " />
                                <label htmlFor="male"  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Male </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 rounded-t-lg">
                            <div className="flex items-center ps-3">
                                <input id="female" type="radio" onClick={(e) => setGender(e.target.value)} value={"female"} name="gender" className="w-4 h-4 text-gray-400  focus:ring-gray-600 "/>
                                <label htmlFor="female" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Famale</label>
                            </div>
                        </li>
                    </ul>
                    {error &&
                        <div className="pointer-events-none w-full flex items-center px-2 py-2 rounded-sm bg-red-600 text-white mb-2"><GoInfo className="mr-3 w-5 h-5"/>{error}</div>
                    }
                    
                    <button onClick={submitForm} className="w-full rounded-sm bg-slate-600 hover:bg-slate-500 active:bg-slate-700 text-white px-5 py-2 uppercase shadow-2xl">
                        Register
                    </button>
                </form>

                <div className="w-1/6 mx-auto text-center py-2 flex items-center">
                    <hr className="w-1/2 border-1/2 border-slate-600"/>
                    <span className="px-2 mx-auto">or</span>
                    <hr className="w-1/2 border-1/2 border-slate-600"/>
                </div>

                <div className="w-1/6 mx-auto text-center">
                    <p className=""><a href="/login" className="text-blue-500 underline underline-offset-2">Sign in</a>, if already have an account.</p>
                </div>
            </div>
        </section>
    )
}

export default RegisterComponent