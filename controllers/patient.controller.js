const Patient = require("../models/patient.model");
const Room = require("../models/room.model");
const defaultSize = 10;

const getPatientAll = (req, res) => {
  const { length, page } = req.body;

  const limit = length ? length : defaultSize;
  const offset = page ? (page - 1) * limit : 0;

  Patient.findAll({
    limit: limit,
    offset: offset,
    // order: sorting.sortQuery(req, defaultSort, defaultDirection),
  })
    .then((data) => {
      return res.status(200).json({
        data: data ? data : [],
        count: data ? data.length : 0,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg:
          err.message || "Some error occurred while retrieving patients list.",
      });
    });
};

const getPatientById = (req, res) => {
  const id = req.params.id;

  Patient.findByPk(id)
    .then((data) => {
      return res.status(200).json({
        data: data ? data : [],
        count: data ? data.length : 0,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.message || "Some error occurred while retrieving patients.",
      });
    });
};

const updatePatient = async (req, res) => {
  const id = req.params.id;

  const data = await Patient.update(req.body, {
    where: { id: id },
  });
  if (!data) {
    return res.status(500).json({
      result: 0,
      msg: `Update patient ${id} failed`,
    });
  }
  return res.status(200).json({
    result: 1,
    msg: "Update patient successfully",
  });
};

const deletePatient = async (req, res) => {
  const id = req.params.id;
  const data = await Patient.destroy({
    where: { id: id },
  });
  if (!data) {
    return res.status(500).json({
      result: 0,
      msg: `Delete patient ${id} failed`,
    });
  }
  return res.status(200).json({
    result: 1,
    msg: "Delete patient successfully",
  });
};

module.exports = {
  getPatientAll,
  getPatientById,
  updatePatient,
  deletePatient,
};
