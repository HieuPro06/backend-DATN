const express = require("express");
const AppointmentRouter = express.Router();
const {
  getAppointmentAll,
  getAppointmentByID,
  //   createAppointment,
  //   updateAppointment,
  deleteAppointment,
  //   getNumericalOrder,
} = require("../controllers/appointment.controller.js");

AppointmentRouter.get("/", getAppointmentAll);
AppointmentRouter.get("/:id", getAppointmentByID);
AppointmentRouter.delete("/:id", deleteAppointment);

module.exports = AppointmentRouter;
