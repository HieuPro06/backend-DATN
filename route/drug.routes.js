const express = require("express");
const DrugRouter = express.Router();
const {
  getAllDrugs,
  getDrugById,
  createDrug,
  updateDrug,
  deleteDrug,
} = require("../controllers/drug.controller.js");

DrugRouter.get("/", getAllDrugs);
DrugRouter.get("/:id", getDrugById);
DrugRouter.post("/", createDrug);
DrugRouter.put("/:id", updateDrug);
DrugRouter.delete("/:id", deleteDrug);

module.exports = DrugRouter;
