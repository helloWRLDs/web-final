import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
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
            type: String
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        created: {
            type: Date
        }

    }
)

userSchema.pre("save", async function(next) {
    const user = this
    user.created = new Date()
    user.password = await bcrypt.hash(user.password, 12)
    return next()
})

const User = mongoose.model("User", userSchema);


export default User;