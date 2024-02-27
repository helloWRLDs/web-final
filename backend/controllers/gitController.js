import serverErrorHandler from "../middleware/serverErrorHandler.js";
import { getGitProfile, getGitRepositories } from "../util/githubService.js";
import logger from "../configs/logger.js";

export const getUserByEmail = serverErrorHandler(async(req, res) => {
    const email = req.params.email
    const response = await getGitProfile(email);
    if (response.status === 200) {
        res.status(200).json(response.data.items[0])
        logger.info(`git data of ${email} received`)
        return
    }
    logger.warn(`git account with id=${email} not found`)
    res.status(404).json({message: "Git account not found"})
})

export const getRepositoryByUserName = serverErrorHandler(async(req, res) => {
    const userName = req.params.userName
    const response = await getGitRepositories(userName);
    if (response.status === 200) {
        res.status(200).json(response.data)
        logger.info(`git repositories of ${userName} received`)
        return
    }
    logger.warn("couldn't get repositories of ", userName)
    res.status(404).json({message: "Repos not found"})
})