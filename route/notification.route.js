const express = require("express");
const NotificationRouter = express.Router();
const isLogInController = require("../controllers/is-logIn.controller");
const isAdminController = require("../controllers/is-admin.controller");
const {getAllRooms, getRoomById,createRoom, updateRoom,deleteRoom} = require("../controllers/room.controller");

RoomRouter.get("/:id",isLogInController, getRoomById);

module.exports = RoomRouter;