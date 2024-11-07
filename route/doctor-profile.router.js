const express = require("express");
const DoctorProfileRoute = express.Router();
const doctorProfileController = require("../controllers/doctor-profile.controller");
const isLogInController = require("../controllers/is-logIn.controller");

DoctorProfileRoute.get("/",isLogInController, doctorProfileController);

module.exports = DoctorProfileRoute;