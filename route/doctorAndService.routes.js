const express = require("express");
const DoctorServiceRouter = express.Router();
const {
  getDoctorsFromServiceId,
  deleteDoctorService,
  getServicesFromDoctorId,
  createDoctorAndService,
} = require("../controllers/doctorAndService.controller.js");

DoctorServiceRouter.post("/", createDoctorAndService);
DoctorServiceRouter.delete("/:id", deleteDoctorService);

module.exports = DoctorServiceRouter;
