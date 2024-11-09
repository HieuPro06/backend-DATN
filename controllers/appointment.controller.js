const Appointment = require("../models/appointment.model.js");

const defaultSize = 10;
const defaultSort = "id";
const defaultDirection = "ASC";
const condition_active = { active: 1 };

const getAppointmentAll = (req, res) => {
  const { size, page } = req.body;

  const limit = size ? size : defaultSize;
  const offset = page ? (page - 1) * limit : 0;
  const condition = condition_active;

  Appointment.findAll({
    where: condition,
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
          err.message ||
          "Some error occurred while retrieving appointment list.",
      });
    });
};

const getAppointmentByID = (req, res) => {
  const id = req.params.id;

  Appointment.findByPk(id)
    .then((data) => {
      res.send({
        data: data ? data : [],
        count: data ? data.length : 0,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointment.",
      });
    });
};

const createAppointment = (req, res) => {
  const appointment_values = {
    booking_id: req.body.booking_id,
    doctor_id: req.body.doctor_id,
    patient_id: req.body.patient_id,
    patient_name: req.body.patient_name,
    patient_birthday: req.body.patient_birthday,
    patient_reason: req.body.patient_reason,
    patient_phone: req.body.patient_phone,
    numerical_order: req.body.numerical_order,
    position: req.body.position,
    appointment_time: req.body.appointment_time,
    date: req.body.date,
    status: req.body.status,
    create_at: new Date(), // automatically set the current date and time
    update_at: new Date(), // automatically set the current date and time
  };

  Appointment.create(appointment_values)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred creating appointment",
      });
    });
};

const updateAppointment = (req, res) => {
  const id = req.params.id;

  Appointment.update(req.body)
    .then((data) => {
      if (data == 1)
        res.send({
          message: "Appointment was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot update Appointment with id=${id}`,
      });
    });
};

const deleteAppointment = (req, res) => {
  const id = req.params.id;

  Appointment.update(
    { active: 0 },
    {
      where: { id: id, active: 1 },
    }
  )
    .then((data) => {
      if (data == 1)
        res.send({
          message: "Appointment was removed successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot remove Appointment with id=${id}`,
      });
    });
};

module.exports = {
  getAppointmentAll,
  getAppointmentByID,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
