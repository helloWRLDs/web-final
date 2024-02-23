import serverErrorHandler from "../middleware/serverErrorHandler.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import notify from "../services/notifier.js"
import jwt from 'jsonwebtoken'
import { getSecretKey } from "../configs/config.mjs"
import generateToken from "../services/generateToken.js"

const registerUser = serverErrorHandler(async(req, res, next) => {
    if (!req.body.email || !req.body.firstName || !req.body.password) {
        res.status(422).json({message: "Unprocessable Entity: Essential fields are empty"})
        return
    }

    const newUser = new User(req.body)

    if (await User.findOne({email: newUser.email})) {
        res.status(400).json({message: "User with such email alredy exists"})
        return
    }
    const result = await newUser.save()
    notify(newUser.email, newUser.firstName)
    res.status(200).json({message: `User registered with id=${result._id}`})
})

const loginUser = serverErrorHandler(async(req, res) => {
    const user = req.body
    const isExist = await User.findOne({email: user.email}).count()
    if (!isExist) {
        res.status(404).json({message: `User with such email doesn't exist`})
        return
    }
    const existingUser = await User.findOne({email: user.email})
    if (await bcrypt.compare(user.password, existingUser.password)) {
        generateToken(res, existingUser._id, existingUser.isAdmin)
        res.status(200).json({message: "login successful"})
    } else {
        res.status(401).json({message: "Wrong password"})
    }
})

export {registerUser, loginUser}