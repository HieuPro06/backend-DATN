const jwt = require("jsonwebtoken");
const Patient = require("../models/patient.model");
const dotenv = require("dotenv");
dotenv.config();

const changeAvatarPatientController = async (data, req, res, next) => {
  try {
    const payload = jwt.decode(data);
    const result = await Patient.update(
      {
        avatar: `${process.env.ENV_DEVELOPMENT}/Patient/${req.file?.filename}`,
      },
      {
        where: { id: payload?.patient.id },
      }
    );
    if (result) {
      const afterChangePassword = await Patient.findOne({
        where: { id: payload?.patient.id },
      });
      return res.status(200).json({
        result: 1,
        msg: "Upload avatar successfully",
        data: afterChangePassword.avatar,
      });
    }
    console.log("Upload avatar failed");
    return res.status(500).json({
      result: 0,
      msg: "Upload avatar failed",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const changeAvatarAndroidPatientController = async (data, req, res, next) => {
  try {
    const user_id = req.params.id;
    const result = await Patient.update(
      {
        avatar: `${process.env.ENV_DEVELOPMENT}/Patient/${req.file?.filename}`,
      },
      {
        where: { id: user_id },
      }
    );
    if (result) {
      const afterChangePassword = await Patient.findOne({
        where: { id: user_id },
      });
      return res.status(200).json({
        result: 1,
        msg: "Upload avatar successfully",
        data: afterChangePassword.avatar,
      });
    }
    console.log("Upload avatar failed");
    return res.status(500).json({
      result: 0,
      msg: "Upload avatar failed",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

module.exports = {
  changeAvatarPatientController,
  changeAvatarAndroidPatientController,
};
