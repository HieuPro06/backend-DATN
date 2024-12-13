const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");
const dotenv = require("dotenv");
dotenv.config();

const changeAvatarDoctorController = async (data, req, res, next) => {
  try {
    const payload = jwt.decode(data);
    const result = await Doctor.update(
      { avatar: `${process.env.ENV_DEVELOPMENT}/Doctor/${req.file.filename}` },
      {
        where: { id: payload.doctor.id },
      }
    );
    if (result) {
      const afterChangePassword = await Doctor.findOne({
        where: { id: payload.doctor.id },
      });
      return res.status(200).json({
        result: 1,
        msg: "Upload avatar successfully",
        data: afterChangePassword.avatar,
      });
    }
    return res.status(500).json({
      result: 0,
      msg: "Upload avatar failed",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

module.exports = { changeAvatarDoctorController };
