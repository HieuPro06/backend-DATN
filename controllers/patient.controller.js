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
      res.send({
        data: data ? data : [],
        count: data ? data.length : 0,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients list.",
      });
    });
};

const getPatientById = (req, res) => {
  const id = req.params.id;

  Patient.findByPk(id)
    .then((data) => {
      res.send({
        data: data ? data : [],
        count: data ? data.length : 0,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients.",
      });
    });
};

const updatePatient = async (req, res) => {
  const id = req.params.id;

  const data = await Patient.update(req.body, {
    where: { id: id },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      message: `Update patient ${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Update patient successfully",
  });
};

const deletePatient = async (req, res) => {
  const id = req.params.id;
  const data = await Patient.destroy({
    where: { id: id },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      message: `Delete patient ${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Delete patient successfully",
  });
};

module.exports = {
  getPatientAll,
  getPatientById,
  updatePatient,
  deletePatient,
};
