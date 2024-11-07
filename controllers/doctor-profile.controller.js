const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");
const doctorProfileController = async (data,req,res,next) => {
    const payload = jwt.decode(data);
    const result = await Doctor.findOne({
        where: {id: payload.id}
    })
    res.status(200).json({
        data: result
    })
}
module.exports = doctorProfileController;