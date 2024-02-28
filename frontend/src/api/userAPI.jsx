import axios from 'axios'

const BASE_API = 'http://localhost:3000/users'
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Authorization",
      "Authorization": localStorage.getItem("token")
    }
};

export const authenticateUser = async(user) => {
    const requestString = BASE_API + '/login'
    let response
    try {
        response = await axios.post(requestString, user, config)
    } catch(error) {
        response = error.response
    }
    return response
}

export const registerUser = async(user) => {
    const requestString = BASE_API + '/signup'
    let response
    try {
        response = await axios.post(requestString, user, config)
    } catch(error) {
        response = error.response
    }
    return response
}

export const getUser = async(id) => {
    const requestString = BASE_API + `/${id}`
    let response
    try {
        response = await axios.get(requestString, config)
    } catch(error) {
        response = error.response
    }
    return response
}

export const deleteUser = async(id) => {
    const requestString = BASE_API + `/${id}`
    let response
    try {
        response = await axios.delete(requestString, config)
    } catch(error) {
        response = error.response
    }
    return response
}

export const getAllUsers = async() => {
    let response
    try{
        response = await axios.get(BASE_API, config)
    } catch(error) {
        response = error.response
    } 
    return response
}

export const changeUserRole = async(id, role) => {
    const requestString = BASE_API + `/${id}`
    let response
    try {
        response = await axios.put(requestString, {isAdmin: role}, config)
    } catch (error) {
        console.error(error)
        response = error.response        
    }
    return response
}