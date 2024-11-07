const express = require("express");
const LoginRouter = express.Router();
const loginController = require("../controllers/login.controller");

LoginRouter.post("/",loginController);

module.exports = LoginRouter;