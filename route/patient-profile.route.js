const express = require("express");
const isLogInController = require("../controllers/is-logIn.controller");
const PatientProfileController = require("../controllers/patient-profile.controller");
const ChangePatientProfileController = require("../controllers/change-patient-profile.controller");
const PatientProfileRouter = express.Router();

PatientProfileRouter.get("/", isLogInController, PatientProfileController);
PatientProfileRouter.put(
  "/",
  isLogInController,
  ChangePatientProfileController
);

module.exports = PatientProfileRouter;
