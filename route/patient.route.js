const express = require("express");
const PatientRouter = express.Router();
const isAdminController = require("../controllers/is-admin.controller");
const isLoggedInController = require("../controllers/is-logIn.controller");
const {getPatientAll, getPatientById, updatePatient,deletePatient} = require("../controllers/patient.controller");

PatientRouter.get("/",isAdminController,getPatientAll);
PatientRouter.get("/:id",isLoggedInController, getPatientById);
PatientRouter.put("/:id",isAdminController,updatePatient);
PatientRouter.delete("/:id",isAdminController,deletePatient);

module.exports = PatientRouter;