const express = require("express");
const AppointmentRouter = express.Router();
const {
  getAppointmentAll,
  getAppointmentByID,
  //   createAppointment,
  updateAppointment,
  deleteAppointment,
  //   getNumericalOrder,
} = require("../controllers/appointment.controller.js");
const isLogInController = require("../controllers/is-logIn.controller");
const isDoctorController = require("../controllers/is-doctor.controller");

AppointmentRouter.get("/",isLogInController,getAppointmentAll);
AppointmentRouter.get("/:id",isLogInController,getAppointmentByID);
AppointmentRouter.delete("/:id",isDoctorController,deleteAppointment);
AppointmentRouter.put("/:id",isDoctorController,updateAppointment);

module.exports = AppointmentRouter;
