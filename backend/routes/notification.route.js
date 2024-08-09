import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
      deleteNotification,
      getNotification,
      deleteSingleNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.route("/")
      .get(protectRoute, getNotification)
      .delete(protectRoute, deleteNotification)

router.route("/:notificationId")
      .delete(protectRoute, deleteSingleNotification)

export default router;