const jwt = require("jsonwebtoken");
const isSupporterController = (req,res,next) => {
    const access_token = req.headers["authorization"];
    const token = access_token.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.hasOwnProperty("doctor")
        || (payload.doctor.role !== "supporter" && payload.doctor.role !== "admin")) {
        res.status(400).json({
            result: 0,
            msg: "This account not be supporter",
        });
    }
    next();
}

module.exports = isSupporterController;