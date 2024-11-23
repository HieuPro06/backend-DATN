const express = require("express");
const AppointmentRecordRouter = express.Router();
const {createNewAppointmentRecord, getAppointmentRecord, updateAppointmentRecord, getAllAppointmentRecords}  = require("../controllers/appointment-record.controller");
const isDoctorController = require("../controllers/is-doctor.controller");
const isLogInController = require("../controllers/is-logIn.controller");

AppointmentRecordRouter.get("/",isLogInController,getAllAppointmentRecords);
AppointmentRecordRouter.get("/:id",isLogInController,getAppointmentRecord);
AppointmentRecordRouter.post("/",isDoctorController,createNewAppointmentRecord);
AppointmentRecordRouter.put("/:id",isDoctorController,updateAppointmentRecord)

module.exports = AppointmentRecordRouter;