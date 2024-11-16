const AppointmentRecord = require("../models/appointment-record.model");

const createNewAppointmentRecord = async (req, res) => {
  const request = {
    appointment_id: req.body.appointment_id,
    reason: req.body.reason,
    description: req.body.description,
    status_before: req.body.status_before,
    status_after: req.body.status_after,
  };
  const data = await AppointmentRecord.create(request);
  if (!data) {
    res.status(500).json({
      result: 0,
      msg: "Can't create new appointment record",
    });
  }
  res.status(200).json({
    result: 1,
    msg: "Create appointment record successfully",
    data: data,
  });
};

const getAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  const data = await AppointmentRecord.findOne({
    where: { appointment_id: appointmentId },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      msg: "Can't get appointment record",
    });
  }
  res.status(200).json({
    result: 1,
    msg: "Get appointment record successfully",
    data: data,
  });
};

module.exports = {
  createNewAppointmentRecord,
  getAppointment,
};
