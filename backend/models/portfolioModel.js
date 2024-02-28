import mongoose from 'mongoose'
import { projectShema } from './projectModel.js'

const Schema = mongoose.Schema

const portfolioSchema = mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    projects: {
        type: [projectShema]
    }
})

portfolioSchema.pre("save", async function(next) {
    const portfolio = this
    portfolio.projects = new Array()
    next()
})

const Portfolio = mongoose.model("Portfolio", portfolioSchema)

export default Portfolio