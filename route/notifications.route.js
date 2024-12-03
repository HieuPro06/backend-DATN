const express = require("express");
const NotificationsRouter = express.Router();
const isLogInController = require("../controllers/is-logIn.controller");
const {
  getAllNotifications,
  getNotificationById,
  createNotification,
  markAsRead,
  markAsReadAll,
} = require("../controllers/notification.controller");

NotificationsRouter.get("/", isLogInController, getAllNotifications);
NotificationsRouter.get("/:id", isLogInController, getNotificationById);
NotificationsRouter.post("/", isLogInController, createNotification);
NotificationsRouter.put("/mark-as-read/:id", isLogInController, markAsRead);
NotificationsRouter.put("/mark-as-read-all/", isLogInController, markAsReadAll);

module.exports = NotificationsRouter;
