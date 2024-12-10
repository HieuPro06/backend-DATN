const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
// const base64Url = require("../utils/index");
// const crypto = require("crypto");
const jwt = require("jsonwebtoken");
dotenv.config();

const loginController = async (req, res) => {
  /* Đăng nhập bên web - doctor */
  try {
    if (req.body.type !== "patient") {
      const request = {
        type: req.body.type ?? "null",
        email: req.body.email,
        password: req.body.password,
      };
      const result = await Doctor.findOne({
        where: { email: request.email },
      });
      if (result) {
        bcrypt.compare(request.password, result.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ msg: "Error comparing passwords" });
          }
          if (!isMatch) {
            return res.status(401).json({
              result: 0,
              msg: "Wrong password",
            });
          }
          // Generate token
          // const header = {
          //     "alg": "HS256",
          //     "typ": "JWT"
          // }
          const payload = {
            doctor: {
              id: result.id,
              role: result.role,
            },
            expire: Date.now() + 3600,
          };
          // const encodeHeader = base64Url(JSON.stringify(header));
          // const encodePayload = base64Url(JSON.stringify(payload));
          // const tokenData = `${encodeHeader}.${encodePayload}`;
          // const hmac = crypto.createHmac("sha256",process.env.JWT_SECRET);
          // const signature = hmac.update(tokenData).digest("base64url");
          // const token = `${tokenData}.${signature}`;
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "100h",
          });
          return res.status(200).json({
            result: 1,
            msg: "Login successfully",
            accessToken: token,
            data: {
              id: result.id,
              email: result.email,
              phone: result.phone,
              name: result.name,
              description: result.description,
              price: result.price,
              role: result.role,
              speciality_id: result.speciality_id,
              room_id: result.room_id,
              avatar: result.avatar,
              create_at: result.create_at,
              update_at: result.update_at,
            },
          });
        });
      } else {
        return res.status(404).json({
          msg: "Account invalid",
        });
      }
    } else {
      /* Đăng nhập bên app - patient */
      const request = {
        type: req.body.type ?? "patient",
        phone: req.body.phone,
        password: req.body.password,
      };
      /* Tìm xem số điện thoại này đã được đăng ký chưa */
      const result = await Patient.findOne({
        where: { phone: request.phone },
      });
      /* Nếu mà SĐT đã được đăng ký */
      if (result) {
        bcrypt.compare(request.password, result.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ msg: "Error comparing passwords" });
          }
          if (!isMatch) {
            return res.status(401).json({
              result: 0,
              msg: "Wrong password",
            });
          }
          const payload = {
            patient: {
              id: result.id,
              phone: result.phone,
            },
            expire: Date.now() + 3600,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "100h",
          });
          for (let key in result) {
            if (key === "password") {
              delete obj[key];
            }
          }
          return res.status(200).json({
            result: 1,
            msg: "Login successfully",
            accessToken: token,
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
        });
      } else {
        return res.status(404).json({
          result: 0,
          msg: "Account invalid",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      result: 0,
      msg: err.message || "Some error occurred when sign in",
    });
  }
};
module.exports = loginController;
