const Speciality = require("../models/speciality.model");
const Doctor = require("../models/doctor.model");

const defaultSize = 10;

const getAllSpeciality = async (data, req, res, next) => {
  try {
    const { size, page } = req.body;
    const limit = size ? size : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    const result = await Speciality.findAll({
      limit: limit,
      offset: offset,
    });
    if (!result) {
      return res.status(500).json({
        result: 0,
        msg: "Error , Don't get specialities",
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Get all specialities successfully",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const getSpecialityById = async (data, req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Speciality.findOne({
      where: { id: id },
    });
    if (!result) {
      return res.status(500).json({
        result: 0,
        msg: `Get speciality with id=${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Get speciality successfully",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const createSpeciality = async (req, res) => {
  try {
    const request = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image ?? "",
    };
    const data = await Speciality.create(request);
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: "Create speciality failed",
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Create speciality successfully",
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
const updateSpeciality = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Speciality.update(req.body, {
      where: { id: id },
    });
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: `Update speciality ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Update speciality successfully",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
const deleteSpeciality = async (req, res) => {
  try {
    const id = req.params.id;
    const isExistDoctor = await Doctor.findOne({
      where: { speciality_id: id },
    });
    if (isExistDoctor) {
      res.json({
        result: 0,
        msg: "This speciality can't be deleted because it's have doctor",
      });
    }
    const data = await Speciality.destroy({
      where: { id: id },
    });
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: `Delete speciality ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Delete speciality successfully",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

module.exports = {
  getAllSpeciality,
  getSpecialityById,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
};
