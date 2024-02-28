import axios from 'axios'

const BASE_API = 'http://localhost:3000/portfolios'
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Authorization",
      "Authorization": localStorage.getItem("token")
    }
};

export const getPortfolioByUser = async(id) => {
    const requestString = BASE_API + `/${id}`
    try {
        const response = await axios.get(requestString, config)
        return response
    } catch(error) {
        console.error(error)
        return error.response
    }
}