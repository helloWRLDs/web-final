import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'

const registerUser = asyncHandler(async(req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        age: req.body.age ?? 0,
        country: req.body.country ?? "",
        gender: req.body.gender === 0 ? "Male" : req.body.gender === 1 ? "Female" : "undefined",
        isAdmin: req.body.isAdmin === "true" ? true : false
    }
    const userExists = await User.findOne({ "email": req.body.email }).exec()
    if (userExists) res.status(400).send("User already exists");
    
    res.status(200).json(newUser)
})

export {registerUser}