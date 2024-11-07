const express = require("express");
const PatientRouter = express.Router();
const isAdminController = require("../controllers/is-admin.controller");
const {getPatientAll, getPatientById, updatePatient,deletePatient} = require("../controllers/patient.controller");

PatientRouter.get("/",isAdminController,getPatientAll);
PatientRouter.get("/:id",isAdminController, getPatientById);
PatientRouter.put("/:id",isAdminController,updatePatient);
PatientRouter.delete("/:id",isAdminController,deletePatient);

module.exports = PatientRouter;