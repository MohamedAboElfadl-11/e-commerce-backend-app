import UserModel from "../../../Database/Models/user.model.js";
import { emitter } from "../../../Services/sendEmail.service.js";
import emailTemplate from "../../../Templates/sendVirficatioEmail.templets.js";
import genOtp from "../../../Utils/genOtp.utils.js";

// signup service create user account
export const signupService = async (req, res) => {
    const userDate = req.body;
    const isUserExist = await UserModel.findOne({
        $or:
            [
                { email: userDate.email },
                { username: userDate.username }
            ]
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
