import jwt from 'jsonwebtoken'
import { getSecretKey } from '../configs/config.mjs'

export const authenticate = async(req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).json({message: "Authorization Failed(no token)"})
        return
    }
    try {
        const decoded = jwt.verify(token, getSecretKey())
        req.id = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next()
    } catch(error) {
        res.status(401).json({message: "Authorization Failed(invalid token)"})
    }
}

export const authenticateAdmin = async(req, res, next) => {
    if (req.id && req.isAdmin) {
        next()
    } else {
        res.status(403).json({message: "Insufficient permissions"})
    }
}
