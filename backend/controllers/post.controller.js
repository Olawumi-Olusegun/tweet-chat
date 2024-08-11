import cloudinary from "../lib/cloudinary.js";
import { extractCloudinaryImageIdFromUrl } from "../lib/extractCloudinaryImageIdFromUrl.js";
import NotificationModel from "../models/notification.model.js";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";

export const createPost = async (req, res) => {

    const { text } = req.body;

    let { image } = req.body;

    const currentlyLoggedInUserId = req.userId.toString();

    try {
        const user = await UserModel.findById(currentlyLoggedInUserId);

        if(!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        if(!text && !image) {
            return res.status(400).json({ success: false, message: "Post must have a text or an image" })
        }

        if(image) {
            const uploadResponse =  await cloudinary.uploader.upload(image);
            image = uploadResponse.secure_url;
        }

        const newPost = new PostModel({
            user: currentlyLoggedInUserId,
            text,
            image,
        });

        const savedPost = await newPost.save();
 
        const response = {
            data: savedPost,
            message: "Post created successfully",
            success: true,
        }

        return res.status(201).json(response)
    } catch (error) {
        console.log(`CREATE POST:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}


export const followUnFollowUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deletePost = async (req, res) => {

    const {postId} = req.params;

    const currentlyLoggedInUserId = req.userId.toString();

    try {

        const post = await PostModel.findById(postId);

        if(!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }

        if(post.user.toString() !== currentlyLoggedInUserId) {
            return res.status(400).json({ success: false, message: "Unauthorized: You are not allowed to delete this post" })
        }

        if(post.image) {
            const imageId = extractCloudinaryImageIdFromUrl(post.image)
            await cloudinary.uploader.destroy(imageId)
        }

        const deletedPost =  await PostModel.findByIdAndDelete(postId);

        if(!deletedPost) {
            return res.status(400).json({ success: false, message: "Unable to delete post" })
        }

        return res.status(200).json({ success: true, message: "Post deleted successfully" })
        
    } catch (error) {
        console.log(`DELETE POST:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const commentOnPost = async (req, res) => {
    const { postId } = req.params;
    const text = req.body.comment;
    const currentlyLoggedInUserId = req.userId.toString();

    try {

        if(!text) {
            return res.status(400).json({ success: false, message: "Comment text is required" })
        }

        const post = await PostModel.findById(postId);

        if(!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }

        const comment = { user: currentlyLoggedInUserId, text }

        post.comments.push(comment);

        const commented  = await post.save();

        if(!commented) {
            return res.status(400).json({ success: false, message: "Post comment not saved" })
        }

        const response = {
            data: commented,
            message: "Post comment was successful",
            success: true,
        }

        return res.status(200).json(response)
 
    } catch (error) {
        console.log(`COMMMENT ON POST:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const likeAndUnlikePost = async (req, res) => {
    
    const { postId } = req.params;
    const currentlyLoggedInUserId = req.userId.toString();
  
    try {

        const post = await PostModel.findById(postId);

        if(!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }

        const userLikedPost = post.likes.includes(req.userId);

        if(userLikedPost) {

            await PostModel.updateOne({ _id: postId }, { $pull: {likes: currentlyLoggedInUserId }});
            await UserModel.updateOne({ _id: currentlyLoggedInUserId }, { $pull: { likedPosts: postId } });
            
            const updatedLikes = post.likes.filter((id) => id.toString() !== currentlyLoggedInUserId );

            const response = {
                data: updatedLikes,
                success: true,
                message: "Post unliked was successfull"
            }

            return res.status(200).json(response)
        } else {
            post.likes.push(req.userId);
            await UserModel.updateOne({ _id: currentlyLoggedInUserId }, { $push: { likedPosts: postId } });
            await post.save();
            const notification = new NotificationModel({
                from: currentlyLoggedInUserId,
                to: post.user,
                type: "like",
            });

            await notification.save();

            const response = {
                data: post.likes, 
                success: true, 
                message: "Post liked successfully"
            }
 
            return res.status(200).json(response);
        }
 
    } catch (error) {
        console.log(`COMMMENT ON POST:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const getAllPosts = async (req, res) => {

    try {

        const posts = await PostModel.find({}).sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password"
        }).
        populate({
            path: "comments.user",
            select: "-password"
        })

        if(!posts) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }

        if(!posts.length === 0) {
            const response = {
                data: [],
                message: "All posts",
                success: true,
            }
    
            return res.status(200).json(response)
        }

        const response = {
            data: posts,
            message: "All posts",
            success: true,
        }

        return res.status(200).json(response)

 
    } catch (error) {
        console.log(`GET ALL POST:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const getLikedPosts = async (req, res) => {

    const { userId } = req.params;

    try {

        const user = await UserModel.findById(userId);

        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const likedPosts = await PostModel.find({_id: {$in: user.likedPosts } })
        .populate({ path: "user", select: "-password", })
        .populate({ path: "comments.user", select: "-password", })

        const response = {
            data: likedPosts,
            message: "All post likes",
            success: true,
        }
        return res.status(200).json(response)

    } catch (error) {
        console.log(`GET LIKED POSTS:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const getFollowingPosts = async (req, res) => {

    const currentlyLoggedInUserId = req.userId.toString();

    try {

        const user = await UserModel.findById(currentlyLoggedInUserId);


        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const following = user.following;

        const feedPosts = await PostModel.find({ user: {$in: following } })
        .sort({ createdAt: -1 })
        .populate({ path: "user", select: "-password", })
        .populate({ path: "comments.user", select: "-password", });


        if(!feedPosts) {
            return res.status(404).json({ success: false, message: "No post found" })
        }

        const response = {
            data: feedPosts,
            message: "All following posts",
            success: true,
        }

        return res.status(200).json(response);

    } catch (error) {
        console.log(`GET FOLLOWING FEED POSTS:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}


export const getUserPosts = async (req, res) => {

    const currentlyLoggedInUserId = req.userId.toString();

    const {userName} = req.params;

    try {

        const user = await UserModel.findOne({userName});


        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }


        const posts = await PostModel.find({ user: currentlyLoggedInUserId })
            .sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password", })
            .populate({ path: "comments.user", select: "-password", });

        const response = {
            data: posts,
            message: "All following posts",
            success: true,
        }

        return res.status(200).json(response);

    } catch (error) {
        console.log(`GET USER FEED POSTS:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}