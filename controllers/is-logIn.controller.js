const isLogInController = (req, res, next) => {
  const access_token = req.headers["authorization"];
  if (!access_token) {
    res.status(400).json({
      message: "Not logged in",
    });
  }
  const token_data = access_token.split(" ")[1];
  next(token_data);
};
module.exports = isLogInController;
