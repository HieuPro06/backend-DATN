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
const isSupporterController = require("../controllers/is-supporter.controller");
const {orderAppointments} = require("../controllers/appointment.controller");

AppointmentRouter.get("/",isLogInController,getAppointmentAll);
AppointmentRouter.get("/:id",isLogInController,getAppointmentByID);
AppointmentRouter.delete("/:id",isSupporterController,deleteAppointment);
AppointmentRouter.put("/:id",isLogInController,updateAppointment);
AppointmentRouter.post("/order",isSupporterController,orderAppointments);
module.exports = AppointmentRouter;
