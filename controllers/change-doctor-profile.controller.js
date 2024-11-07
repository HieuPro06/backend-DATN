const Doctor = require("../models/doctor.model");
const jwt = require("jsonwebtoken");
const changeDoctorProfileController = async (data,req,res,next) => {
    const payload = jwt.decode(data);
    const result = await Doctor.update(req.body,
        {
            where: {id: payload.id}
        }
    );
    console.log(result)
    if(!result){
        res.status(500).json({
            message: "Can't update personal info !!!"
        })
    }
    res.status(200).json({
        result: 1,
        message: "Update personal info successfully",
    })
}
module.exports = changeDoctorProfileController;