import axios from 'axios'
import path from 'path'

const BASE_API = 'http://localhost:3000/users'
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //   "Access-Control-Allow-Headers": "Authorization"
    }
};


//returning id
export const authenticateUser = async(user) => {
    const requestString = BASE_API + '/login'
    const response = await axios.post(requestString, user, config)
    console.log(response.data)
    if (response.status === 200) {
        const token = response.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('id', response.data.id)
        return response.data.id
    }
}

export const getUser = async(id) => {
    const requestString = BASE_API + `/${id}`
    const response = await axios.get(requestString, {headers: {"Authorization": localStorage.getItem("token")}})
    if (response.status === 200) {
        return response.data
    }
    if (response.status === 401) {
        return response.data
    }
}