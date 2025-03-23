import mongoose from "mongoose";
import *as constants from "../../Constants/constants.js";
import { decryption, encryption, hashing } from "../../Utils/crypto.utils.js";

const userSchema = new mongoose.Schema({
    email: { // using in login
        type: String,
        unique: true,
        required: true,
        index: true
    },
    username: { // using in login
        type: String,
        unique: true,
        required: true,
        index: true
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
    role: {
        type: String,
        enum: Object.values(constants.roles),
        default: constants.roles.USER
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    userOtps: [{
        code: {
            type: String,
        },
        codeType: {
            type: String,
            enum: Object.values(constants.otpCodeType)
        },
        expDate: {
            type: Date,
        }
    }],
    isAccountConfirmed: {
        type: Boolean,
        default: false
    },
    profilePic: {
        secure_url: String,
        public_id: String
    },
    coverPic: {
        secure_url: String,
        public_id: String
    },
    changeCredentialTime: Date,
    deletedAt: Date,
    bannedAt: Date, // admin
    DOB: Date,
    bio: String,
}, {
    timestamps: true
});

userSchema.pre('save', async function () {
    if (this.isModified('phone')) this.phone = encryption(this.phone, process.env.SECRET_KEY)
    if (this.isModified('password')) this.password = hashing(this.password, +process.env.SALT)
})

userSchema.post('findOne', async function (doc) {
    if (doc.phone) doc.phone = decryption(doc.phone, process.env.SECRET_KEY);
})

const UserModel = mongoose.models.users || mongoose.model('users', userSchema);
export default UserModel