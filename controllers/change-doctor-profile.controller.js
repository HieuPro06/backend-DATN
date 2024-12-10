const Doctor = require("../models/doctor.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const changeDoctorProfileController = async (data, req, res, next) => {
  const payload = jwt.decode(data);
  const salt = 10;
  if (req.body.action === "personal") {
    const result = await Doctor.update(req.body, {
      where: { id: payload.doctor.id },
    });
    if (!result) {
      return res.status(500).json({
        msg: "Can't update personal info !!!",
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Update personal info successfully",
    });
  } else if (req.body.action === "avatar") {
    const urlObj = {
      avatar: req.body.url,
    };
    const result = await Doctor.update(urlObj, {
      where: { id: payload.doctor.id },
    });
    if (!result) {
      return res.status(500).json({
        msg: "Can't update avatar !!!",
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Update avatar successfully",
    });
  } else if (req.body.action === "password") {
    const result = await Doctor.findOne({
      where: { id: payload.doctor.id },
    });
    /* Check xem mật khẩu nhập vào đã đúng chưa */
    bcrypt.compare(
      req.body.currentPassword,
      result.password,
      async (err, isMatch) => {
        if (err) {
          return res.status(500).json({ msg: "Error comparing passwords" });
        }
        if (!isMatch) {
          return res.status(400).json({
            result: 0,
            msg: "Wrong password , please re-enter",
          });
        }
        const request = {
          password: req.body.newPassword,
        };
        bcrypt.hash(request.password, salt, async (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({ msg: "Error hashing password" });
          }
          request.password = hashedPassword;
          try {
            const isUpdatePassword = await Doctor.update(request, {
              where: { id: payload.doctor.id },
            });
            if (isUpdatePassword) {
              const afterUpdateData = await Doctor.findOne({
                where: { id: payload.doctor.id },
              });
              return res.status(200).json({
                result: 1,
                msg: "Update password successfully",
                data: {
                  id: afterUpdateData.id,
                  email: afterUpdateData.email,
                  phone: afterUpdateData.phone,
                  name: afterUpdateData.name,
                  description: afterUpdateData.description,
                  price: afterUpdateData.price,
                  role: afterUpdateData.role,
                  active: afterUpdateData.active,
                  avatar: afterUpdateData.avatar,
                  create_at: afterUpdateData.create_at,
                  update_at: afterUpdateData.update_at,
                  speciality_id: afterUpdateData.speciality_id,
                  room_id: afterUpdateData.room_id,
                  recovery_token: afterUpdateData.recovery_token,
                },
              });
            }
          } catch (err) {
            return res.status(500).json({
              result: 0,
              msg: err.message || "Some error occurred when update password",
            });
          }
        });
      }
    );
  }
};
module.exports = changeDoctorProfileController;
