const express = require("express");
const RoomRouter = express.Router();
const isLogInController = require("../controllers/is-logIn.controller");
const isAdminController = require("../controllers/is-admin.controller");
const {getAllRooms, getRoomById,createRoom, updateRoom,deleteRoom} = require("../controllers/room.controller");

RoomRouter.get("/",isLogInController,getAllRooms);
RoomRouter.get("/:id",isLogInController, getRoomById);
RoomRouter.post("/",isAdminController,createRoom);
RoomRouter.put("/:id",isAdminController,updateRoom);
RoomRouter.delete("/:id",isAdminController,deleteRoom);

module.exports = RoomRouter;