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
const isDoctorController = require("../controllers/is-doctor.controller");

DrugRouter.get("/", isDoctorController, getAllDrugs);
DrugRouter.get("/:id",isDoctorController, getDrugById);
DrugRouter.post("/",isAdminController, createDrug);
DrugRouter.put("/:id",isAdminController, updateDrug);
DrugRouter.delete("/:id",isAdminController, deleteDrug);

module.exports = DrugRouter;
