const express = require("express");
const DoctorRouter = express.Router();
const {
  getDoctorAll,
  getDoctorByID,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctor.controller.js");

DoctorRouter.get("/", getDoctorAll);
DoctorRouter.get("/:id", getDoctorByID);
DoctorRouter.post("/", createDoctor);
DoctorRouter.put("/:id", updateDoctor);
DoctorRouter.delete("/:id", deleteDoctor);

module.exports = DoctorRouter;
