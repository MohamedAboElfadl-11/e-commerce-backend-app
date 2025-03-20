import { DateTime } from "luxon";
import UserModel from "../../../Database/Models/user.model.js";
import { emitter } from "../../../Services/sendEmail.service.js";
import emailTemplate from "../../../Templates/sendVirficatioEmail.templets.js";
import { comparing } from "../../../Utils/crypto.utils.js";
import genOtp from "../../../Utils/genOtp.utils.js";
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid";

// signup service create user account
export const signupService = async (req, res) => {
    const userDate = req.body;
    const isUserExist = await UserModel.findOne({
        $or: [{ email: userDate.email }, { username: userDate.username }]
    });

    if (isUserExist) return res.status(400).json({ message: "user already exist" });
    const { otp, hashedOtp, otpExpiration } = genOtp()
    userDate.verificationCode = {
        code: hashedOtp,
        expDate: otpExpiration
    };

    emitter.emit('sendEmail', {
        subject: "Your verification code",
        to: userDate.email,
        html: emailTemplate(userDate.firstName, otp, `Verify your Account`)
    })

    await UserModel.create(userDate);
    res.status(200).json({ message: 'Account created successfully, please check your mail box to confirm your account' });
}

// verify user account
export const verifyAccountService = async (req, res) => {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email, isAccountConfirmed: false })
    if (!user) return res.status(404).json({ message: "user not found" });
    const { code, expDate } = user.verificationCode
    console.log(user.verificationCode)
    const isOtpMatch = await comparing(otp, code)
    if (!isOtpMatch || DateTime.now() > expDate) return res.status(400).json({ message: 'otp has expired' });
    await UserModel.updateOne(
        { _id: user._id },
        {
            $set: { isAccountConfirmed: true },
            $unset: { verificationCode: '' }
        }
    );
    res.status(200).json({ message: 'Account confirmed successfully' })
}

// login service
export const loginService = async (req, res) => {
    const userCredentials = req.body;
    const user = await UserModel.findOne({
        $or: [{ email: userCredentials.email }, { username: userCredentials.username }]
    })
    if (!user
        || (user.deletedAt && user.deletedAt <= new Date())
        || (user.bannedAt && user.bannedAt <= new Date())
    ) return res.status(400).json({ message: "wrong email or password" })
    const password = await comparing(userCredentials.password, user.password);
    if (!password) return res.status(400).json({ message: "wrong email or password" })
    user.lastLogin = new Date()
    await user.save()
    const accesstoken = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.ACCESS_TOKEN,
        { expiresIn: '7d', jwtid: uuidv4() }
    );
    const refreshtoken = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.REFRESH_TOKEN,
        { expiresIn: '7d', jwtid: uuidv4() }
    )
    res.status(200).json({ message: 'Login successfully', tokens: { accesstoken, refreshtoken } })
}