const Doctor = require("../models/doctor.model");
// const base64Url = require("../utils/index");
const dotenv = require("dotenv");
// const crypto = require("crypto");
const jwt = require("jsonwebtoken");
dotenv.config();

const loginController = async (req, res) => {
  const request = {
    type: req.body.type ?? "null",
    email: req.body.email,
    password: req.body.password,
  };
  const result = await Doctor.findOne({
    where: { email: request.email },
  });
  if (result) {
    if (result.password !== request.password) {
      res.status(400).json({
        message: "Wrong password",
      });
    } else {
      // Generate token
      // const header = {
      //     "alg": "HS256",
      //     "typ": "JWT"
      // }
      const payload = {
        id: result.id,
        role: result.role,
        expire: Date.now() + 3600,
      };
      // const encodeHeader = base64Url(JSON.stringify(header));
      // const encodePayload = base64Url(JSON.stringify(payload));
      // const tokenData = `${encodeHeader}.${encodePayload}`;
      // const hmac = crypto.createHmac("sha256",process.env.JWT_SECRET);
      // const signature = hmac.update(tokenData).digest("base64url");
      // const token = `${tokenData}.${signature}`;
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      res.status(200).json({
        accessToken: token,
      });
    }
  } else {
    res.status(404).json({
      message: "Account invalid",
    });
  }
};
module.exports = loginController;
