import jwt from "jsonwebtoken"
import { getSecretKey } from "../configs/config.mjs"

const generateToken = (res, id, isAdmin) => {
    const token = jwt.sign({id: id, isAdmin: isAdmin}, getSecretKey(), {expiresIn: '1h'})
    res.setHeader("Authorization", `Bearer ${token}`)
    res.setHeader("Access-Control-Allow-Headers", "Authorization")
    return token
}

export default generateToken