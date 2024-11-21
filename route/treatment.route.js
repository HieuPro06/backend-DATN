const express = require("express");
const TreatmentRouter = express.Router();
const {createNewTreatment, getTreatment} = require("../controllers/treatment.controller");
const isDoctorController = require("../controllers/is-doctor.controller");
const isLogInController = require("../controllers/is-logIn.controller");

TreatmentRouter.post("/",isDoctorController,createNewTreatment);
TreatmentRouter.get("/:id",isLogInController,getTreatment);

module.exports = TreatmentRouter;