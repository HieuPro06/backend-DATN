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

const getAppointmentRecord = async (req, res) => {
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
  else{
    res.status(200).json({
      result: 1,
      msg: "Get appointment record successfully",
      data: data,
    });
  }
};
const updateAppointmentRecord = async (req,res) => {
  const appointmentId = req.params.id;
  const request = {
    reason: req.body.reason,
    description: req.body.description,
    status_before: req.body.status_before,
    status_after: req.body.status_after,
    update_at: Date.now()
  }
  try{
    const result = await AppointmentRecord.update(request,{
      where: {appointment_id: appointmentId}
    })
    if(result){
      const afterUpdateData = await AppointmentRecord.findOne({
        where: {appointment_id: appointmentId}
      })
      res.status(200).json({
        result: 1,
        msg: "Update appointment-record successfully",
        data: afterUpdateData
      })
    }
  } catch (e) {
    res.status(500).json({
      result: 0,
      msg: e.message || "Some error occur when update appointment-record"
    })
  }
}

module.exports = {
  createNewAppointmentRecord,
  getAppointmentRecord,
  updateAppointmentRecord
};
