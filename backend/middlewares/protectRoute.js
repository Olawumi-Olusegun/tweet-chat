import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {

    const accessToken = req.cookies["accessToken"];

    if(!accessToken) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" })
    }

    try {

        const decoded = jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET || "");

        if(!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" })  
        }

        const user = await UserModel.findById(decoded?.userId).select("-password");

        if(!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: user not found" })  
        }

        req.userId = user.id;
        next();

    } catch (error) {
        return res.status(500).json({ success: false, message: "Unauthorized: unknown token" })
    }
}