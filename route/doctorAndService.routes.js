const express = require("express");
const DoctorServiceRouter = express.Router();
const {
  deleteDoctorService,
  createDoctorAndService,
} = require("../controllers/doctorAndService.controller.js");

DoctorServiceRouter.post("/", createDoctorAndService);
DoctorServiceRouter.delete("/:id", deleteDoctorService);

module.exports = DoctorServiceRouter;
