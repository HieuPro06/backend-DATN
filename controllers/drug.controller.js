const Drug = require("../models/drug.model");
const Doctor = require("../models/doctor.model");

const defaultSize = 1000000;

const getAllDrugs = async (data, req, res, next) => {
  const { length, page } = req.body;
  const limit = length ? length : defaultSize;
  const offset = page ? (page - 1) * limit : 0;
  const result = await Drug.findAll({
    limit: limit,
    offset: offset,
  });
  if (!result) {
    res.status(500).json({
      result: 0,
      message: "Error , Don't get drugs",
    });
  }
  res.status(200).json({
    result: 1,
    message: "Get all drugs successfully",
    data: result,
  });
};

const getDrugById = async (data, req, res, next) => {
  const id = req.params.id;
  const result = await Drug.findOne({
    where: { id: id },
  });
  if (!result) {
    res.status(404).json({
      result: 0,
      message: `Get drug with id=${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Get drug successfully",
    data: result,
  });
};

const createDrug = async (req, res) => {
  const request = {
    name: req.body.name,
    location: req.body.location ?? "Nhà thuốc Việt Nam",
  };
  const isExistDrugName = await Drug.findOne({
    where: { name: request.name },
  });
  if (isExistDrugName) {
    res.status(400).json({
      result: 0,
      message: "Drug name was exist",
    });
  }
  const data = await Drug.create(request);
  if (!data) {
    res.status(500).json({
      result: 0,
      message: "Create drug failed",
    });
  }
  res.status(200).json({
    result: 1,
    message: "Create drug successfully",
    data: data,
  });
};
const updateDrug = async (req, res) => {
  const id = req.params.id;
  const data = await Drug.update(req.body, {
    where: { id: id },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      message: `Update drug ${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Update drug successfully",
  });
};
const deleteDrug = async (req, res) => {
  const id = req.params.id;
  const isExistDoctor = await Doctor.findOne({
    where: { drug_id: id },
  });
  if (isExistDoctor) {
    res.json({
      result: 0,
      message: "This drug can't be deleted because it's have doctor",
    });
  }
  const data = await Drug.destroy({
    where: { id: id },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      message: `Delete drug ${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Delete drug successfully",
  });
};

module.exports = {
  getAllDrugs,
  getDrugById,
  createDrug,
  updateDrug,
  deleteDrug,
};
