import { DateTime } from "luxon";
import { hashing } from "./crypto.utils.js"

const genOtp = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = hashing(otp, +process.env.SALT);
    const otpExpiration = DateTime.now().plus({ minutes: 10 }).toJSDate();
    return { otp, hashedOtp, otpExpiration };
}

export default genOtp;
