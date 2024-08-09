import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (userId, res) => {
    const accessToken = jwt.sign({userId}, process.env.JWT_TOKEN_SECRET, { expiresIn: "15d"});

    res.cookie("accessToken", accessToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        secure: process.env.NODE === "production",
        sameSite: "strict" // CSRF attacks cross-site request forgery attacks
    })
}