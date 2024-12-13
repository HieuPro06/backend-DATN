const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");
const dotenv = require("dotenv");
dotenv.config();

const doctorProfileController = async (data, req, res, next) => {
  try {
    const payload = jwt.decode(data);
    const result = await Doctor.findOne({
      where: { id: payload.doctor.id },
    });
    return res.status(200).json({
      result: 1,
      msg: "Successfully",
      data: {
        id: result.id,
        email: result.email,
        phone: result.phone,
        name: result.name,
        description: result.description,
        price: result.price,
        role: result.role,
        active: result.active,
        avatar: result.avatar,
        create_at: result.create_at,
        update_at: result.update_at,
        speciality_id: result.speciality_id,
        room_id: result.room_id,
        recovery_token: result.recovery_token,
      },
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
module.exports = doctorProfileController;
