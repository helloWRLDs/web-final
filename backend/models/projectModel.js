import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const projectShema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    additional_info: {
        type: String
    },
    link: {
        type: String
    }
})

const Project = mongoose.model("Project", projectShema)

export default Project