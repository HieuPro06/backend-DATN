const express = require("express");
const TreatmentRouter = express.Router();
const {createNewTreatment, getTreatment, getAllTreatments, updateTreatment, deleteTreatment} = require("../controllers/treatment.controller");
const isDoctorController = require("../controllers/is-doctor.controller");
const isLogInController = require("../controllers/is-logIn.controller");

TreatmentRouter.get("/",isLogInController,getAllTreatments);
TreatmentRouter.get("/:id",isLogInController,getTreatment);
TreatmentRouter.post("/",isDoctorController,createNewTreatment);
TreatmentRouter.put("/:id",isDoctorController,updateTreatment);
TreatmentRouter.delete("/:id",isDoctorController,deleteTreatment);

module.exports = TreatmentRouter;