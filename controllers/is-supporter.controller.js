const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isSupporterController = (req, res, next) => {
  try {
    const access_token = req.headers["authorization"];
    const token = access_token.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (
      !payload.hasOwnProperty("doctor") ||
      (payload.doctor.role !== "supporter" && payload.doctor.role !== "admin")
    ) {
      return res.status(400).json({
        result: 0,
        msg: "This account not be supporter",
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

module.exports = isSupporterController;
