const express = require("express");
const TreatmentRouter = express.Router();
const {createNewTreatment, getTreatment} = require("../controllers/treatment.controller");
const isDoctorController = require("../controllers/is-doctor.controller");

TreatmentRouter.post("/",isDoctorController,createNewTreatment);
TreatmentRouter.get("/:id",getTreatment);

module.exports = TreatmentRouter;