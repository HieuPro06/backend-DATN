const express = require("express");
const NotificationsRouter = express.Router();
const isLogInController = require("../controllers/is-logIn.controller");
const {
  getAllNotifications,
  getNotificationById,
  createNotification,
  markAsRead,
  markAsReadAll,
  countUnread,
  deleteNotification,
} = require("../controllers/notification.controller");

NotificationsRouter.get("/", isLogInController, getAllNotifications);
NotificationsRouter.get("/unread", isLogInController, countUnread);
NotificationsRouter.get("/:id", isLogInController, getNotificationById);
NotificationsRouter.delete("/:id", isLogInController, deleteNotification);
NotificationsRouter.put("/mark-as-read/:id", isLogInController, markAsRead);
NotificationsRouter.put("/mark-as-read-all/", isLogInController, markAsReadAll);

module.exports = NotificationsRouter;
