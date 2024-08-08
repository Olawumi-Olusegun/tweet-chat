import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/sign-in")
      .post(signIn)

router.route("/sign-up")
      .post(signUp)

export default router;