const express = require("express");
const DoctorRouter = express.Router();
const {
  getDoctorAll,
  getDoctorByID,
  createDoctor,
  updateDoctor,
} = require("../controllers/doctor.controller.js");

DoctorRouter.get("/", getDoctorAll);
DoctorRouter.get("/:id", getDoctorByID);
DoctorRouter.post("/", createDoctor);
DoctorRouter.put("/:id", updateDoctor);

module.exports = DoctorRouter;
