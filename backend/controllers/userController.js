import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'

const registerUser = asyncHandler(async(req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age ?? 0,
        country: req.body.country ?? "",
        gender: req.body.gender === 0 ? "Male" : req.body.gender === 1 ? "Female" : "undefined",
        isAdmin: req.body.isAdmin === "true" ? true : false
    })

    if (await User.findOne({email: newUser.email})) {
        res.status(400).json({message: "User with such email alredy exists"})
        return
    }
    const result = await newUser.save()
    res.status(200).json({message: `Registered user with id=${result._id}`})
})

const loginUser = asyncHandler(async(req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    })
    const isExist = await User.findOne({email: user.email}).count()
    if (!isExist) {
        res.status(404).json({message: `User with such email doesn't exist`})
        return
    }
    const existingUser = await User.findOne({email: user.email})
    if (await bcrypt.compare(user.password, existingUser.password)) {
        res.status(200).json({message: "login successful"})
    } else {
        res.status(401).json({message: "Wrong password"})
    }
})

export {registerUser, loginUser}