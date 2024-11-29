const isLogInController = (req, res, next) => {
  const access_token = req.headers["authorization"];
  if (!access_token) {
    return res.status(400).json({
      result: 0,
      msg: "Not logged in"
    });
  }
  const token_data = access_token.split(" ")[1];
  next(token_data);
};
module.exports = isLogInController;
