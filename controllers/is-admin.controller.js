const jwt = require("jsonwebtoken");

const isAdminController = (req, res, next) => {
  const access_token = req.headers["authorization"];
  const token_data = access_token.split(" ")[1];
  const decodeToken = jwt.verify(token_data, process.env.JWT_SECRET);
  if (decodeToken.role !== "admin") {
    res.status(400).json({
      result: 0,
      message: "You are not an admin ",
    });
  }
  next();
};

module.exports = isAdminController;
