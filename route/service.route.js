const express = require("express");
const ServiceRouter = express.Router();
const isLogInController = require("../controllers/is-logIn.controller");
const isAdminController = require("../controllers/is-admin.controller");
const {getAllServices, getServiceById,createService, updateService,deleteService} = require("../controllers/services.controller");

ServiceRouter.get("/",isLogInController,getAllServices);
ServiceRouter.get("/:id",isLogInController, getServiceById);
ServiceRouter.post("/",isAdminController,createService);
ServiceRouter.put("/:id",isAdminController,updateService);
ServiceRouter.delete("/:id",isAdminController,deleteService);

module.exports = ServiceRouter;