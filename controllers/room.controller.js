const Room = require("../models/room.model");
const Appointment  =  require("../models/appointment.model");
const Service = require("../models/service.model");
const Doctor = require("../models/doctor.model");
const dotenv = require("dotenv");
dotenv.config();

const defaultSize = 1000000;

const getAllRooms = async (data, req, res, next) => {
  try {
    const { length, page } = req.body;
    const limit = length ? length : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    const result = await Room.findAll({
      limit: limit,
      offset: offset,
    });
    if (!result) {
      return res.status(500).json({
        result: 0,
        msg: "Error , Don't get rooms",
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Get all rooms successfully",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const getRoomById = async (data, req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Room.findOne({
      where: { id: id },
    });
    if (!result) {
      return res.status(404).json({
        result: 0,
        msg: `Get room with id=${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Get room successfully",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const createRoom = async (req, res) => {
  try {
    const request = {
      name: req.body.name.trim(),
      location: req.body.location,
      speciality_id: req.body.spe
    };
    const isExistRoomName = await Room.findOne({
      where: { name: request.name },
    });
    if (isExistRoomName) {
      return res.status(400).json({
        result: 0,
        msg: "Room name was exist",
      });
    }
    const data = await Room.create(request);
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: "Create room failed",
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Create room successfully",
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
const updateRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const existNameRoom = await Room.findOne({
      where: {name: req.body.name}
    })
    if(existNameRoom && existNameRoom.id !== parseInt(id)){
      return res.status(400).json({
        result: 0,
        msg: "This room is exist"
      })
    }
    const data = await Room.update(req.body, {
      where: { id: id },
    });
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: `Update room ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Update room successfully",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
const deleteRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const isExistAppointment = await Appointment.findOne({
      where: { room_id: id },
    });
    const isExistService = await Service.findOne({
      where: { room_id: id },
    });
    if (isExistAppointment) {
      return res.status(400).json({
        result: 0,
        msg: "This room can't be deleted because it's have appointment",
      });
    }
    if (isExistService) {
      return res.status(400).json({
        result: 0,
        msg: "This room can't be deleted because it's have service",
      });
    }
    const data = await Room.destroy({
      where: { id: id },
    });
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: `Delete room ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Delete room successfully",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
