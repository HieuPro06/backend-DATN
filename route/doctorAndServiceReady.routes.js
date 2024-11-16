const express = require("express");
const DoctorServiceReadyRouter = express.Router();
const {
  doctorAndServiceReady,
} = require("../controllers/doctorAndServiceReady.controller.js");

DoctorServiceReadyRouter.get("/", doctorAndServiceReady);

module.exports = DoctorServiceReadyRouter;
