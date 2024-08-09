import NotificationModel from "../models/notification.model.js";

export const getNotification = async (req, res) => {

    const userId = req.userId;

    try {
        const notification = await NotificationModel.find({ to: userId })
        .populate({
            path: "from",
            select: "userName profileImage"
        });

        await NotificationModel.updateMany({ to: userId }, { read: true });

        const response = {
            data: notification,
            message: "All notifications",
            success: true,
        }

        return res.status(200).json(response);

    } catch (error) {
        console.log(`GET NOTIFICATIONS:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const deleteNotification = async (req, res) => {

    const userId = req.userId;

    try {

        await NotificationModel.deleteMany({ to: userId });

        const response = {
            data: null,
            message: "All deleted successfully",
            success: true,
        }

        return res.status(200).json(response);

    } catch (error) {
        console.log(`DELETE NOTIFICATIONS:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const deleteSingleNotification = async (req, res) => {

    const { notificationId } = req.params;
    const userId = req.userId;

    try {

        const notification = await NotificationModel.findById(notificationId);

        if(!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" })
        }

        if(notification.to.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized: You're not allowed to delete this notification" })
        }

        const deletedNotification = await NotificationModel.findByIdAndDelete(notificationId);

        if(deletedNotification) {
            return res.status(403).json({ success: false, message: "Unable to delete notification" })
        }

        const response = {
            data: null,
            message: "Notification deleted successfully",
            success: true,
        }

        return res.status(200).json(response);

    } catch (error) {
        console.log(`DELETE SINGLE NOTIFICATIONS:`, error)
        return res.status(500).json({ success: false, message: "Something went wrong" })
    }
}