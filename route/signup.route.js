const express = require("express");
const SignUpRoute = express.Router();
const SignupController = require("../controllers/signup.controller");

SignUpRoute.post("/",SignupController);

module.exports = SignUpRoute;