import mongoose from "mongoose";
import *as constants from "../../Constants/constants";

const userSchema = new mongoose.Schema({
    email: { // using in login
        type: String,
        unique: true,
        required: true
    },
    username: { // using in login
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Object.values(constants.gender),
        default: constants.gender.NON
    },
    verifyEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(constants.roles),
        default: constants.roles.USER
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    DOB: Date,
    bio: String,
}, {
    timestamps: true
});

const UserModel = mongoose.models.users || mongoose.model('users', userSchema);
export default UserModel