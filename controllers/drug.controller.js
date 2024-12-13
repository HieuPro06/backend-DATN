const Drug = require("../models/drug.model");
const Doctor = require("../models/doctor.model");
const dotenv = require("dotenv");
dotenv.config();

const defaultSize = 1000000;

const getAllDrugs = async (info, req, res, next) => {
  try {
    const { length, page } = req.body;
    const limit = length ? length : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    const result = await Drug.findAll({
      limit: limit,
      offset: offset,
    });
    if (result) {
      return res.status(200).json({
        result: 1,
        msg: "Get all drugs successfully",
        data: result,
      });
    }
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const getDrugById = async (data, req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Drug.findOne({
      where: { id: id },
    });
    if (!result) {
      return res.status(404).json({
        result: 0,
        msg: `Get drug with id=${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Get drug successfully",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const createDrug = async (req, res) => {
  try {
    const request = {
      name: req.body.name,
      location: req.body.location ?? "Nhà thuốc Việt Nam",
    };
    const isExistDrugName = await Drug.findOne({
      where: { name: request.name },
    });
    if (isExistDrugName) {
      return res.status(400).json({
        result: 0,
        msg: "Drug name was exist",
      });
    }
    const data = await Drug.create(request);
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: "Create drug failed",
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Create drug successfully",
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
const updateDrug = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Drug.update(req.body, {
      where: { id: id },
    });
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: `Update drug ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Update drug successfully",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
const deleteDrug = async (req, res) => {
  try {
    const id = req.params.id;
    const isExistDoctor = await Doctor.findOne({
      where: { drug_id: id },
    });
    if (isExistDoctor) {
      res.json({
        result: 0,
        msg: "This drug can't be deleted because it's have doctor",
      });
    }
    const data = await Drug.destroy({
      where: { id: id },
    });
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: `Delete drug ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Delete drug successfully",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

module.exports = {
  getAllDrugs,
  getDrugById,
  createDrug,
  updateDrug,
  deleteDrug,
};
