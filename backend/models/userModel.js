import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { getGitProfile } from "../util/githubService.js";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number
        },
        country: {
            type: String
        },
        gender: {
            type: String,
            Enumerator: ["male", "female"]
        },
        isAdmin: {
            type: Boolean,
        },
        created: {
            type: Date
        },
        git: {
            login: String,
            avatar_url: String,
            link: String,
        }
    }
)

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    user.created = new Date();
    user.isAdmin = false;
    let response 
    try {
        response = await getGitProfile(user.email)
        if (response.status === 200) {
            const responseData  = response.data.items[0]
            user.git.login = responseData.login;
            user.git.avatar_url = responseData.avatar_url
            user.git.link = responseData.html_url
        }
    } catch(error) {
        user.git = {}
        next()
    }
    next();
});

userSchema.pre('updateOne', async function(next) {
    const update = this.getUpdate();
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 12);
    }
    next();
});

const User = mongoose.model("User", userSchema);


export default User;