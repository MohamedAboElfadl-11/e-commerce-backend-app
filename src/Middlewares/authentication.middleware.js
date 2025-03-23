import jwt from "jsonwebtoken";
import BlackListTokensModel from "../Database/Models/blackListTokens.model.js";
import UserModel from "../Database/Models/user.model.js";

const authenticationMiddlware = () => {
    return async (req, res, next) => {
        const { accesstoken } = req.headers;
        if (!accesstoken) return res.status(400).json({ message: 'access token required' });
        const decodedAccesstoken = jwt.verify(accesstoken, process.env.ACCESS_TOKEN);
        const isTokenBlackListed = await BlackListTokensModel.findOne({ tokenId: decodedAccesstoken.jti })
        if (isTokenBlackListed) return res.status(401).json({ message: "Token expired please, Login again" })
        const user = await UserModel.findById(decodedAccesstoken._id)
        if (!user) return res.status(404).json({ message: "user not found please, signup" })
        req.loginUser = user;
        req.loginUser.token = {
            tokenId: decodedAccesstoken.jti,
            expiryDate: decodedAccesstoken.exp
        }
        next()
    }
}

export default authenticationMiddlware;