import express from "express";

import { protectRoute } from "../middlewares/protectRoute.js";
import {
    commentOnPost,
    createPost,
    deletePost,
    getAllPosts,
    getFollowingPosts,
    getLikedPosts,
    getUserPosts,
    likeAndUnlikePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all-posts", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.get("/likes/:userId", protectRoute, getLikedPosts);
router.delete("/:postId", protectRoute, deletePost);
router.get("/like/:postId", protectRoute, likeAndUnlikePost);
router.post("/comment/:postId", protectRoute, commentOnPost);


export default router;