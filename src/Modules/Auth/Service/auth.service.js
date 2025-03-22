import { DateTime } from "luxon";
import UserModel from "../../../Database/Models/user.model.js";
import { emitter } from "../../../Services/sendEmail.service.js";
import emailTemplate from "../../../Templates/sendVirficatioEmail.templets.js";
import { comparing } from "../../../Utils/crypto.utils.js";
import genOtp from "../../../Utils/genOtp.utils.js";
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid";
import { otpCodeType } from "../../../Constants/constants.js";
import BlackListTokensModel from "../../../Database/Models/blackListTokens.model.js";

// signup service create user account
export const signupService = async (req, res) => {
    const userDate = req.body;
    const isUserExist = await UserModel.findOne({
        $or: [{ email: userDate.email }, { username: userDate.username }]
    });
    if (isUserExist) return res.status(400).json({ message: "user already exist" });
    const { otp, hashedOtp, otpExpiration } = genOtp()
    userDate.userOtps = {
        code: hashedOtp,
        expDate: otpExpiration,
        codeType: otpCodeType.VERIFY_ACCOUNT
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
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    if (user.isAccountConfirmed) return res.status(409).json({ message: "Email already verified" });

    if (!user.userOtps || user.userOtps.length === 0) {
        return res.status(400).json({ message: 'no otp found' });
    }

    let userOtp = null;
    for (const item of user.userOtps) {
        if (item.codeType === otpCodeType.VERIFY_ACCOUNT) {
            userOtp = item;
            break;
        }
    }

    if (!userOtp) return res.status(409).json({ message: 'invalid otp' })
    const { code, expDate } = userOtp;
    const isOtpMatch = await comparing(otp, code)
    if (!isOtpMatch) return res.status(409).json({ message: 'invalid otp' })
    if (DateTime.now() > expDate) return res.status(400).json({ message: 'otp has expired' });
    await UserModel.updateOne(
        { _id: user._id },
        {
            $set: { isAccountConfirmed: true },
            $pull: { userOtps: { codeType: otpCodeType.VERIFY_ACCOUNT } }
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

// forget password
export const forgetPasswordSeervice = async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'user not foun or user not verified' });
    const { otp, hashedOtp, otpExpiration } = genOtp()
    user.userOtps.push({
        code: hashedOtp,
        expDate: otpExpiration,
        codeType: otpCodeType.RESET_PASSWORD
    });
    emitter.emit('sendEmail', {
        subject: "Reset code",
        to: user.email,
        html: emailTemplate(user.firstName, otp, `Reset your password`)
    })
    await user.save()
    res.status(200).json({ message: 'otp was sended successfully' })
}

// reset password
export const resetPasswordService = async (req, res) => {
    const { email, otp, password, confirmedPassword } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: 'user not found' });

    if (!user.userOtps || user.userOtps.length === 0) {
        return res.status(400).json({ message: 'no otp found' });
    }

    let userOtp = null;
    for (const item of user.userOtps) {
        if (item.codeType === otpCodeType.RESET_PASSWORD) {
            userOtp = item;
            break;
        }
    }

    if (!userOtp) return res.status(409).json({ message: 'invalid otp' })
    const { code, expDate } = userOtp;
    const isOtpMatch = await comparing(otp, code)
    if (!isOtpMatch) return res.status(409).json({ message: 'invalid otp' })
    if (DateTime.now() > expDate) return res.status(400).json({ message: 'otp has expired' });
    await UserModel.updateOne(
        { _id: user._id },
        {
            $pull: { userOtps: { codeType: otpCodeType.RESET_PASSWORD } }
        }
    );
    user.password = password
    await user.save()
    res.status(200).json({ message: 'password reset successfully' })
}

// refresh token services 
export const refreshTokenService = async (req, res) => {
    const { refreshtoken } = req.headers;
    const decodedRefreshToken = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN)
    const isRefreshTokenBlacklisted = await BlackListTokensModel.findOne({ tokenId: decodedRefreshToken.jti });
    if (isRefreshTokenBlacklisted) return res.status(400).json({ message: "Token already blacklisted" })
    const accesstoken = jwt.sign(
        {
            _id: decodedRefreshToken._id, email: decodedRefreshToken.email
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: '1h', jwtid: uuidv4()
        }
    )
    res.status(200).json({ message: "Token refershed successfully", accesstoken });
}


