import cloudinary from "../lib/cloudinary.js";
import NotificationModel from "../models/notification.model.js";
import UserModel from "../models/user.model.js";

export const getUserProfile = async (req, res) => {

    const { userName } = req.params;

    try {

        const user = await UserModel.findOne({userName}).select("-password");

        if(!user) {
            return res.status(500).json({ success: false, message: "User not found" })
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
                createdAt: user.createdAt,
                bio: user.bio,
                link: user.link,
            },
            message: "User Profile",
            success: true,
        }

        return res.status(201).json(response)
        
    } catch (error) {
        console.log(`GET USER PROFILE:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const getSuggestedUsers = async (req, res) => {

    const userId = req.userId;
    
    try {

        const usersFollowedByMe = await UserModel.findById(userId).select("following");

        const users = await UserModel.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                },
            },
            { $sample: { size: 10 } }
        ]);

        const filteredUsers = users.filter((user) => !usersFollowedByMe.following.includes(user._id));

        const suggestedUsers = filteredUsers.slice(0, 4);

        suggestedUsers.forEach((user) => user.password = undefined);

        const response = {
            data: suggestedUsers,
            success: true, 
            message: "Suggested users"
        }

        return res.status(200).json(response);
        
    } catch (error) {
        console.log(`SUGGESTED USERS:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const followUnFollowUser = async (req, res) => {

    const { userId } = req.params;

    try {
        
        const userToModify = await UserModel.findById(userId);
        const currentUser = await UserModel.findById(req.userId);

        if(userId === req.userId) {
            return res.status(400).json({ success: false, message: "You can't follow/unfollow yourself" })
        }

        if(!userToModify || !currentUser) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const isFollowing = currentUser.following.includes(userId);

        if(isFollowing) {
            await UserModel.findByIdAndUpdate(userId, {$pull: { followers: req.userId } } );
            await UserModel.findByIdAndUpdate(req.userId, {$pull: { following: userId } } );
            return res.status(200).json({ success: true, message: "User unfollowed successfully" });
        } else {
            await UserModel.findByIdAndUpdate(userId, {$push: { followers: req.userId } } );
            await UserModel.findByIdAndUpdate(req.userId, {$push: { following: userId } } );
            const newNotification = new NotificationModel({ from: req.userId, to: userToModify.id, type: "follow",  });
            await newNotification.save();
            return res.status(200).json({ success: true, message: "User followed successfully" });
        }

    } catch (error) {
        console.log(`FOLLOW AND UNFOLLOW USER:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const updateUserProfile = async (req, res) => {


    const { fullName, email, userName, currentPassword, newPassword, bio, link } = req.body;
    
    let { profileImage, coverImage } = req.body;

    try {

        let user = await UserModel.findById(req.userId);

        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        if((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ success: false, message: "To update password your must provide both current and new password" });
        }

        if(currentPassword && newPassword) {
            const isMatch = user.isPasswordValid(currentPassword)
            if(!isMatch) {
                return res.status(400).json({ success: false, message: "Current password is incorrect" });    
            }
            if(newPassword.length < 6) {
                return res.status(400).json({ success: false, message: "Password must too short" });    
            }
        }

        if(profileImage) {

            if(user.profileImage) {
                await cloudinary.uploader.destroy(user.profileImage.split("/").pop().split(".")[0]);
            }

           const uploadedResponse = await cloudinary.uploader.upload(profileImage);
           profileImage = uploadedResponse.secure_url;
        }

        if(coverImage) {
            
            if(user.coverImage) {
                await cloudinary.uploader.destroy(user.coverImage.split("/").pop().split(".")[0]);
            }

           const uploadedResponse = await cloudinary.uploader.upload(coverImage);
           coverImage = uploadedResponse.secure_url;
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.userName = userName || user.userName;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImage = profileImage || user.profileImage;
        user.coverImage = coverImage || user.coverImage;

        user = await user.save();

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
                bio: user.bio,
                link: user.link,
            },
            success: true, 
            message: "User profile updated successfully"
        }

        return res.status(200).json(response);
    } catch (error) {
        console.log(`UPDATE USER PROFILE:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}