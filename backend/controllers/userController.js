import serverErrorHandler from "../middleware/serverErrorHandler.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import notify from "../services/notifier.js"
import generateToken from "../services/generateToken.js"
import logger from "../configs/logger.js"
import Portfolio from "../models/portfolioModel.js"
import { getGitRepositories } from "../util/githubService.js"
import Project from "../models/projectModel.js"
import axios from "axios"
import { getGitKey } from "../configs/config.mjs"

export const registerUser = serverErrorHandler(async(req, res) => {
    if (!req.body.email || !req.body.firstName || !req.body.password) {
        res.status(422).json({message: "Unprocessable Entity"})
        return
    }
    // ADD USER TO DB
    const newUser = new User(req.body)
    if (await User.findOne({email: newUser.email})) {
        res.status(400).json({message: "User with such email alredy exists"})
        return
    }
    const result = await newUser.save()
    // INITIALIZE EMPTY PORTFOLIO
    const newPortfolio = new Portfolio({owner: result._id})
    await newPortfolio.save()
    // PARSE PROJECT FROM GIT IF EXISTS
    if (result.git.login) {
        try {   
            const response = await getGitRepositories(result.git.login)
            const projects = response.data.map(item => {
                return new Project({
                    "name": item.name ?? item.full_name,
                    "description": item.description, 
                    "additional_info": item.language,
                    "link": item.html_url
                })
            })
            await Portfolio.updateOne({_id: newPortfolio._id}, {$set: {projects: projects}})
        } catch(error) {
            logger.error(error)
        }
    }
    logger.info(`user registered with id=${result._id}`)
    // notify(newUser.email, newUser.firstName)
    res.status(200).json({message: `User registered with id=${result._id}`})
})

export const loginUser = serverErrorHandler(async(req, res) => {
    const user = req.body
    const isExist = await User.findOne({email: user.email}).count()
    if (!isExist) {
        res.status(404).json({message: `User with such email doesn't exist`})
        return
    }
    const existingUser = await User.findOne({email: user.email})
    if (await bcrypt.compare(user.password, existingUser.password)) {
        const token = generateToken(res, existingUser._id, existingUser.isAdmin)

        res.status(200).json({token: token, id: existingUser._id, isAdmin: existingUser.isAdmin})
    } else {
        res.status(401).json({message: "Wrong password"})
    }
})

export const getUserById = serverErrorHandler(async(req, res) => {
    const id = req.params.id
    const user = await User.findOne({_id: id}).select('-password');
    if (!user) {
        res.status(404).json({message: `User with such id doesn't exist`})
        return
    } 
    res.status(200).json(user)
})

export const getUsers = serverErrorHandler(async(req, res) => {
    const users = await User.find({}).select('-password')
    res.status(200).json(users)
})

export const deleteUserById = serverErrorHandler(async(req, res) => {
    const idToDelete = req.params.id
    const userToDelete = await User.findOne({_id: idToDelete})
    if (!userToDelete) {
        res.status(404).json({message: `User with id=${userToDelete} Not Found`})
        return
        
    }
    console.log('user found\ndeleting...')
    await userToDelete.deleteOne()
    res.status(200).json({message: `Deleted user with id=${idToDelete}`})
})

export const putUserById = serverErrorHandler(async(req, res) => {
    const idToPut = req.params.id
    const userBody = req.body
    const userToUpdate = await User.findOne({_id: idToPut})
    if (!userToUpdate) {
        res.status(404).json({message: `User with id=${putUserById} Not Found`})
        return
    }
    const result = await userToUpdate.updateOne(userBody)
    if (!result.acknowledged) {
        res.status(500).json({message: "Db error"})
        return
    }
    res.status(200).json(result)
})