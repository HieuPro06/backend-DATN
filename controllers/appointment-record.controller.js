const AppointmentRecord = require("../models/appointment-record.model");
const defaultSize = 1000000;

const createNewAppointmentRecord = async (req, res) => {
  const request = {
    appointment_id: req.body.appointment_id,
    reason: req.body.reason,
    description: req.body.description,
    status_before: req.body.status_before,
    status_after: req.body.status_after,
    create_at: Date.now(),
    update_at: Date.now()
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
const getAppointmentRecord = async (info,req, res,next) => {
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
  console.log(request);
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
const getAllAppointmentRecords = async (info,req,res,next) => {
  const { length, page } = req.body;
  const limit = length ? length : defaultSize;
  const offset = page ? (page - 1) * limit : 0;
  try{
    const result = await AppointmentRecord.findAll({
      limit: limit,
      offset: offset,
    })
    res.status(200).json({
      result: 1,
      msg: "Get all appointment-record successfully",
      quantity: result.length,
      data: result
    })
  } catch (e) {
    res.status(500).json({
      result: 0,
      msg: e.message || "Some error occur when get all appointment-records"
    })
  }
}
const deleteAppointmentRecord = async (req,res) => {
  try{
    const data = await AppointmentRecord.destroy({
      where: {appointment_id: req.params.id}
    })
    if(data){
      return res.status(200).json({
        result: 1,
        msg: "Remove successfully"
      })
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      result: 0,
      msg: "Remove failed"
    })
  }
}
module.exports = {
  createNewAppointmentRecord,
  getAppointmentRecord,
  updateAppointmentRecord,
  getAllAppointmentRecords,
  deleteAppointmentRecord
};
