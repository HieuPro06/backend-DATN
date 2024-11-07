const Doctor = require("../models/doctor.model");
const jwt = require("jsonwebtoken");
const changeDoctorProfileController = async (data,req,res,next) => {
    const payload = jwt.decode(data);
    if(req.body.action === "personal"){
        const result = await Doctor.update(req.body,
            {
                where: {id: payload.id}
            }
        );
        if(!result){
            res.status(500).json({
                message: "Can't update personal info !!!"
            })
        }
        res.status(200).json({
            result: 1,
            message: "Update personal info successfully",
        })
    } else if(req.body.action === "avatar"){
        const urlObj = {
            avatar: req.body.url
        }
        const result = await Doctor.update(urlObj,
            {where: {id: payload.id}}
        )
        if(!result){
            res.status(500).json({
                message: "Can't update avatar !!!"
            })
        }
        res.status(200).json({
            result: 1,
            message: "Update avatar successfully",
        })
    }
}
module.exports = changeDoctorProfileController;