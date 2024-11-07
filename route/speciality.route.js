const express = require("express");
const SpecialityRouter = express.Router();
const isLogInController = require("../controllers/is-logIn.controller");
const isAdminController = require("../controllers/is-admin.controller");
const {getAllSpeciality, getSpecialityById,createSpeciality, updateSpeciality} = require("../controllers/speciality.controller");

SpecialityRouter.get("/",isLogInController,getAllSpeciality);
SpecialityRouter.get("/:id",isLogInController, getSpecialityById);
SpecialityRouter.post("/",isAdminController,createSpeciality);
SpecialityRouter.put("/:id",isAdminController,updateSpeciality);

module.exports = SpecialityRouter;