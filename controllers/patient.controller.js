const Patient = require("../models/patient.model");
const Room = require("../models/room.model");
const AppointmentRecord = require("../models/appointment-record.model");
const Treatment = require("../models/treatment.model");
const Appointment = require("../models/appointment.model");
const Booking = require("../models/booking.model");
const defaultSize = 10;
const dotenv = require("dotenv");
dotenv.config();

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

const getPatientById = (info,req, res,next) => {
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
  try {
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
  } catch (err) {
    return res.status(500).json({
      result: 0,
      msg: err,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const id = req.params.id;
    await Booking.destroy({
      where: {patient_id: id}
    })
    const appointment = await Appointment.findOne({
      where: {patient_id: id}
    })
    await AppointmentRecord.destroy({
      where: {appointment_id: appointment.id}
    })
    await Treatment.destroy({
      where: {appointment_id: appointment.id}
    })
    await Appointment.destroy({
      where: {patient_id: id}
    })
    const data = await Patient.destroy({
      where: { id: parseInt(id) },
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
  } catch (err) {
    return res.status(500).json({
      result: 0,
      msg: err,
    });
  }
};

module.exports = {
  getPatientAll,
  getPatientById,
  updatePatient,
  deletePatient,
};
