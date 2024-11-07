const express = require("express");
const SpecialityRouter = express.Router();
const isAdminController = require("../controllers/is-admin.controller");
const createSpeciality = require("../controllers/speciality.controller");

SpecialityRouter.post("/",isAdminController,createSpeciality);


module.exports = SpecialityRouter;