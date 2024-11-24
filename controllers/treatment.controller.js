const Treatment = require("../models/treatment.model");
const defaultSize = 1000000;

const createNewTreatment = async (req, res) => {
  const request = {
    appointment_id: req.body.appointment_id,
    name: req.body.name,
    type: req.body.type,
    times: req.body.times,
    purpose: req.body.purpose,
    instruction: req.body.instruction,
    repeat_days: req.body.repeat_days,
    repeat_time: req.body.repeat_time,
  };
  const data = await Treatment.create(request);
  if (!data) {
    res.status(500).json({
      result: 0,
      msg: "Can't create new treatment record",
    });
  }
  res.status(200).json({
    result: 1,
    msg: "Create treatment record successfully",
    data: data,
  });
};

const getTreatment = async (req, res) => {
  const appointmentId = req.params.id;
  const data = await Treatment.findOne({
    where: { appointment_id: appointmentId },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      msg: "Can't get treatment record",
    });
  }
  res.status(200).json({
    result: 1,
    msg: "Get treatment record successfully",
    data: data,
  });
};
const getAllTreatments = async (info,req,res,next) => {
  const { length, page } = req.body;
  const limit = length ? length : defaultSize;
  const offset = page ? (page - 1) * limit : 0;
  try{
    const result = await Treatment.findAll({
      limit: limit,
      offset: offset,
    })
    res.status(200).json({
      result: 1,
      msg: "Get all treatments successfully",
      quantity: result.length,
      data: result
    })
  } catch (e) {
    res.status(500).json({
      result: 0,
      msg: e.message || "Some error occur when get all treatments"
    })
  }
}

const updateTreatment = async (req,res) => {
  const appointmentId = req.params.id;
  const request = {
    name: req.body.name,
    type: req.body.type,
    times: req.body.times,
    purpose: req.body.purpose,
    instuction: req.body.instuction,
    repeat_days: req.body.repeat_days,
    repeat_time: req.body.repeat_time,
  }
  try{
    const result = await Treatment.update(request,{
      where: {appointment_id: appointmentId}
    })
    if(result){
      const afterUpdateData = await Treatment.findOne({
        where: {appointment_id: appointmentId}
      })
      res.status(200).json({
        result: 1,
        msg: "Update treatment successfully",
        data: afterUpdateData
      })
    }
  } catch (e) {
    res.status(500).json({
      result: 0,
      msg: e.message || "Some error occur when update treatment"
    })
  }
}
module.exports = {
  createNewTreatment,
  getTreatment,
  getAllTreatments,
  updateTreatment
};
