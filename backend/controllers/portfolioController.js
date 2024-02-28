import logger from "../configs/logger.js";
import serverErrorHandler from "../middleware/serverErrorHandler.js";
import Portfolio from "../models/portfolioModel.js";
import Project from "../models/projectModel.js";

export const getPortfolioByUser = serverErrorHandler(async(req, res) => {
    const userId = req.params.id
    let portfolio
    try {
        portfolio = await Portfolio.findOne({owner: userId})
    }catch(error) {
        logger.error(error)
        res.status(500).json({message: error})
        return
    }
    res.status(200).json(portfolio)
})

export const putProjectByUser = serverErrorHandler(async(req, res) => {
    const userId = req.params.id;
    if (!req.body.name) {
        res.status(422).json({message: "Unprocessable Entity"})
        return
    }
    try {
        const project = new Project(req.body)
        delete project._id
        await Portfolio.updateOne({owner: userId}, {$push: {projects: project}})
        res.status(200).json({message: `Project ${project} inserted successfuly`})
    } catch(error) {
        logger.error(error)
        res.status(500).json({message: error})
        return
    }
})

export const deleteProjectByUser = serverErrorHandler(async(req, res) => {
    const projectToDelete = req.params.name
    const userId = req.params.id
    try {
        let portfolio = await Portfolio.findOne({owner: userId})
        portfolio.projects = portfolio.projects.filter(project => project.name !== projectToDelete)
        portfolio.save()
        res.status(200).json({message: `project ${projectToDelete} deleted`})
    } catch(error) {
        logger.error(error)
        res.status(500).json({message: error})
        return
    }
})