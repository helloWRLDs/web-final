import { getGitKey } from "../configs/config.mjs"
import logger from "../configs/logger.js"
import axios from 'axios'

const url = 'https://api.github.com'

const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Authorization",
      "Authorization": `Bearer ${getGitKey()}`,
      "Content-Type": "application/json"
    }
};

export const getGitProfile = async(email) => {
    const requestString = url + `/search/users?q=${email}`
    try {
        const response = await axios.get(requestString, config)
        return response
    } catch(error) {
        logger.error(error)
    }
}

// export const getGitProfile = async(email) => {
//     const requestString = url + `/search/users?q=${email}`
//     try {
//         const response = await fetch(requestString, {headers: {"Authorization": `Bearer ${getGitKey}`}})
//         return response
//     } catch(error) {
//         logger.error(error)
//     }
// }

export const getGitRepositories = async(userName) => {
    const requestString = url + `/users/${userName}/repos`
    try {
        const response = await axios.get(requestString, config)
        return response
    } catch(error) {
        logger.error(error)
    }
}