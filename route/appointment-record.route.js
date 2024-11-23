const express = require("express");
const AppointmentRecordRouter = express.Router();
const {createNewAppointmentRecord, getAppointmentRecord, updateAppointmentRecord}  = require("../controllers/appointment-record.controller");
const isDoctorController = require("../controllers/is-doctor.controller");
const isLogInController = require("../controllers/is-logIn.controller");

AppointmentRecordRouter.post("/",isDoctorController,createNewAppointmentRecord);
AppointmentRecordRouter.get("/:id",isLogInController,getAppointmentRecord);
AppointmentRecordRouter.put("/:id",isDoctorController,updateAppointmentRecord)

module.exports = AppointmentRecordRouter;