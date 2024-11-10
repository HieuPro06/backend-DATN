const Room = require("../models/room.model");
const Doctor = require("../models/doctor.model");

const defaultSize = 1000000;

const getAllRooms = async (data,req,res,next) => {
    const {length, page} = req.body;
    const limit = length ? length : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    const result = await Room.findAll({
        limit: limit,
        offset: offset
    })
    if(!result){
        res.status(500).json({
            result: 0,
            message: "Error , Don't get rooms"
        })
    }
    res.status(200).json({
        result: 1,
        message: "Get all rooms successfully",
        data: result
    })
}

const getRoomById = async (data,req,res,next) => {
    const id = req.params.id;
    const result = await Room.findOne({
        where: {id: id}
    })
    if(!result){
        res.status(404).json({
            result: 0,
            message: `Get room with id=${id} failed`
        })
    }
    res.status(200).json({
        result: 1,
        message: "Get room successfully",
        data: result
    })
}

const createRoom = async (req,res) => {
    const request = {
        name: req.body.name,
        location: req.body.location
    }
    const isExistRoomName = await Room.findOne({
        where: {name: request.name}
    })
    if(isExistRoomName){
        res.status(400).json({
            result: 0,
            message: "Room name was exist"
        })
    }
    const data = await Room.create(request);
    if(!data){
        res.status(500).json({
            result: 0,
            message: "Create room failed"
        })
    }
    res.status(200).json({
        result: 1,
        message: "Create room successfully",
        data: data
    })
}
const updateRoom = async (req,res) => {
    const id = req.params.id;
    const data = await Room.update(req.body,{
        where: {id: id}
    })
    if(!data){
        res.status(500).json({
            result: 0,
            message: `Update room ${id} failed`
        })
    }
    res.status(200).json({
        result: 1,
        message: "Update room successfully"
    })
}
const deleteRoom = async (req,res) => {
    const id = req.params.id;
    const isExistDoctor = await Doctor.findOne({
        where: {room_id: id}
    })
    if(isExistDoctor){
        res.json({
            result: 0,
            message: "This room can't be deleted because it's have doctor"
        })
    }
    const data = await Room.destroy({
        where: {id: id}
    })
    if(!data){
        res.status(500).json({
            result: 0,
            message: `Delete room ${id} failed`
        })
    }
    res.status(200).json({
        result: 1,
        message: "Delete room successfully"
    })
}

module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
};
