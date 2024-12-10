const jwt = require("jsonwebtoken");
const Patient = require("../models/patient.model");

const PatientProfileController = async (data, req, res, next) => {
  try {
    const payload = jwt.decode(data);
    const result = await Patient.findOne({
      where: { id: payload.patient.id },
    });
    return res.status(200).json({
      result: 1,
      msg: "Successfully",
      data: {
        id: result.id,
        email: result.email,
        phone: result.phone,
        name: result.name,
        gender: result.gender,
        birthday: result.birthday,
        address: result.address,
        avatar: result.avatar,
        create_at: result.create_at,
        update_at: result.update_at,
      },
    });
  } catch (err) {
    console.log(err);
    return 0;
  }
};
module.exports = PatientProfileController;
