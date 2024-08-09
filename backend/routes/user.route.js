import express from "express";

import { protectRoute } from "../middlewares/protectRoute.js";
import { followUnFollowUser, getSuggestedUsers, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:userName", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.get("/follow/:userId", protectRoute, followUnFollowUser);
router.get("update-profile", protectRoute, updateUserProfile);

export default router;