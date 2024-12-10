const express = require("express");
const DrugRouter = express.Router();
const {
  getAllDrugs,
  getDrugById,
  createDrug,
  updateDrug,
  deleteDrug,
} = require("../controllers/drug.controller.js");
const isAdminController = require("../controllers/is-admin.controller");
const isLogInController = require("../controllers/is-logIn.controller");

DrugRouter.get("/",isLogInController, getAllDrugs);
DrugRouter.get("/:id",isLogInController, getDrugById);
DrugRouter.post("/",isAdminController, createDrug);
DrugRouter.put("/:id",isAdminController, updateDrug);
DrugRouter.delete("/:id",isAdminController, deleteDrug);

module.exports = DrugRouter;
