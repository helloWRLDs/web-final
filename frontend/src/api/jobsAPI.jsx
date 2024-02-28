import axios from 'axios'

const BASE_API = 'https://jobicy.com/api/v2/remote-jobs?'
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Authorization",
      "User-Agent": "PostmanRuntime/7.36.3",
      "Cookie": "PHPSESSID=3mt20mg4k90u1d06rsdv3tn45f",
      "Accept": "*/*"
    }
};


export const getJobs = async(count, industry, tag) => {
    let requestString = BASE_API
    requestString = count ? requestString + `count=${count}&` : requestString
    requestString = industry ? requestString + `industry=${industry}` : requestString
    requestString = tag ? requestString + `tag=${tag}` : requestString
    let response
    try {
        response = await axios.get(requestString)
    } catch (error) {
        response = error.response
    }
    console.log(response)
    return response
}