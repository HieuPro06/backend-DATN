const isLogInController = (req, res, next) => {
  const access_token = req.headers["authorization"];
  const token_data = access_token.split(" ")[1];
  if (!token_data || token_data === "null") {
    return res.status(400).json({
      result: 0,
      msg: "Not logged in"
    });
  }
  next(token_data);
};
module.exports = isLogInController;
