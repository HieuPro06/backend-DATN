const express = require("express");
const DoctorRouter = express.Router();
const {
  getDoctorAll,
  getDoctorByID,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctor.controller.js");
const isLogInController = require("../controllers/is-logIn.controller");
const isAdminController = require("../controllers/is-admin.controller");

DoctorRouter.get("/",isLogInController,getDoctorAll);
DoctorRouter.get("/:id",isLogInController,getDoctorByID);
DoctorRouter.post("/",isAdminController,createDoctor);
DoctorRouter.put("/:id",isAdminController,updateDoctor);
DoctorRouter.delete("/:id",isAdminController,deleteDoctor);

module.exports = DoctorRouter;
