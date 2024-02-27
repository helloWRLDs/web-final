import axios from 'axios'

const BASE_URL = 'http://localhost:3000/git'
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Authorization",
      "Authorization": localStorage.getItem('token')
    }
};

export const getGitProfile = async(email) => {
    const requestString = BASE_URL + `/${email}`
    let response 
    try {
        response = await axios.get(requestString, config)
    } catch(error) {
        console.error(error)
        response = error.response
    }
    return response    
}

export const getRepositories = async(userName) => {
    const requestString = BASE_URL + `/${userName}/repository`
    let response
    try {
        response = await axios.get(requestString, config)
    } catch(error) {
        console.error(error)
        response = error.response
    }
    return response
}