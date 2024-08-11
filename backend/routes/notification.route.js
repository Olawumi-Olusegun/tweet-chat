import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
      deleteNotifications,
      getNotifications,
      deleteSingleNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.route("/")
      .get(protectRoute, getNotifications)
      .delete(protectRoute, deleteNotifications)

router.route("/:notificationId")
      .delete(protectRoute, deleteSingleNotification)

export default router;