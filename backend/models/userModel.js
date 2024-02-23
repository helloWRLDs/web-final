import mongoose from "mongoose";

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
        }

    }
)

const User = mongoose.model("User", userSchema);


export default User;