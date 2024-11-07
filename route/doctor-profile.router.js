const express = require("express");
const DoctorProfileRoute = express.Router();
const doctorProfileController = require("../controllers/doctor-profile.controller");
const isLogInController = require("../controllers/is-logIn.controller");
const changeDoctorProfileController = require("../controllers/change-doctor-profile.controller");

DoctorProfileRoute.get("/",isLogInController, doctorProfileController);
DoctorProfileRoute.put("/",isLogInController, changeDoctorProfileController);

module.exports = DoctorProfileRoute;