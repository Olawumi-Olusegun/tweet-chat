import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.js";
import UserModel from "../models/user.model.js";

export const signIn = async (req, res) => {

    const { email, password } = req.body;

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if(!emailRegex.test(email)) {
    //     return res.status(400).json({ message: "Invalid email format" })
    // }

    try {

        const user = await UserModel.findOne({ email });

        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const isPasswordCorrect = user.isPasswordValid(password);

        if(!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        generateTokenAndSetCookie(user.id, res);

        const response = {
            data: {
                _id: user.id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
                followers: user.followers,
                following: user.following,
                profileImage: user.profileImage,
                coverImage: user.coverImage,
            },
            message: "You are signed in",
            success: true,
        }

        return res.status(200).json(response)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const signUp = async (req, res) => {
    
    const { userName, fullName, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" })
    }

    if(password.length < 6) {
        return res.status(400).json({ success: false, message: "Password is too short" })
    }

    try {

        const existingUser = await UserModel.findOne({ userName });

        if(existingUser) {
            return res.status(400).json({ success: false, message: "Username already exist" })
        }

        const existingEmail = await UserModel.findOne({ email });

        if(existingEmail) {
            return res.status(400).json({ success: false, message: "Email already exist" })
        }

        const newUser = new UserModel({userName, fullName, email, password});

        const savedUser = await newUser.save();

        if(!savedUser) {
            return res.status(400).json({ success: false, message: "Unable to create user account" })
        }

        generateTokenAndSetCookie(savedUser.id, res);

        const response = {
            data: {
                _id: savedUser.id,
                fullName: savedUser.fullName,
                userName: savedUser.userName,
                email: savedUser.email,
                followers: savedUser.followers,
                following: savedUser.following,
                profileImage: savedUser.profileImage,
                coverImage: savedUser.coverImage,
            },
            message: "User account created",
            success: true,
        }

        return res.status(201).json(response)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const signOut = async (req, res) => {
    try {

        if(!req.userId) {
            return res.status(400).json({ success: false, message: "Unauthorized: You're not logged in"})
        }
        
        res.cookie("accessToken", { maxAge: 0 })
        return res.status(200).json({ success: true, message: "User logged out successfully"})
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const getMe = async (req, res) => {
    
    try {

        const user = await UserModel.findById(req.userId).select("-password");
        
        
        if(!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: user not found" })  
        }

        const response = {
            data: {
                _id: user.id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
                followers: user.followers,
                following: user.following,
                profileImage: user.profileImage,
                coverImage: user.coverImage,
            },
            message: "My data",
            success: true,
        }

        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}