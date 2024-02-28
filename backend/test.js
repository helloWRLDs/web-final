import Portfolio from "./models/portfolioModel.js";
import { connectToDb } from "./configs/config.mjs";
import Project from "./models/projectModel.js";
import axios from "axios";

const main = async() => {
    axios.get('https://api.github.com/repos/helloWRLDs/bookings/languages').then(Response => {
        console.log(Response.data)
    })
}

main()

