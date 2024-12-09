const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");
const doctorProfileController = async (data, req, res, next) => {
  try {
    const payload = jwt.decode(data);
    const result = await Doctor.findOne({
      where: { id: payload.doctor.id },
    });
    res.status(200).json({
      result: 1,
      msg: "Successfully",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
module.exports = doctorProfileController;
