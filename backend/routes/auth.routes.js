import express from "express";
import { getMe, signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.route("/sign-in")
      .post(signIn)

router.route("/sign-up")
      .post(signUp)

router.route("/sign-out")
      .get(protectRoute, signOut)

router.route("/me")
      .get(protectRoute, getMe)

export default router;