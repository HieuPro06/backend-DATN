const express = require("express");
const DashboardRouter = express.Router();
const isLogInController = require("../controllers/is-logIn.controller");
const DashboardController = require("../controllers/dashboard.controller");

DashboardRouter.get("/",isLogInController,DashboardController);

module.exports = DashboardRouter;