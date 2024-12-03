const jwt = require("jsonwebtoken");

const isAdminController = (req, res, next) => {
  const access_token = req.headers["authorization"];
  const token_data = access_token.split(" ")[1];
  const decodeToken = jwt.verify(token_data, process.env.JWT_SECRET);
  if (
    !decodeToken.hasOwnProperty("doctor") ||
    decodeToken.doctor.role !== "admin"
  ) {
    return res.status(400).json({
      result: 0,
      msg: "You are not an admin , you don't allow to do this action",
    });
  }
  next();
};

module.exports = isAdminController;
