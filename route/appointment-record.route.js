const express = require("express");
const AppointmentRecordRouter = express.Router();
const {createNewAppointmentRecord, getAppointment}  = require("../controllers/appointment-record.controller");
const isDoctorController = require("../controllers/is-doctor.controller");
const isLogInController = require("../controllers/is-logIn.controller");

AppointmentRecordRouter.post("/",isDoctorController,createNewAppointmentRecord);
AppointmentRecordRouter.get("/:id",isLogInController,getAppointment);

module.exports = AppointmentRecordRouter;