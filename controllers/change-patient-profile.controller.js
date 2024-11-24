const Patient = require("../models/patient.model");
const jwt = require("jsonwebtoken");

const ChangePatientProfileController = async (data, req, res, next) => {
    const payload = jwt.decode(data);
    if (req.body.action === "personal") {
        const result = await Patient.update(req.body, {
            where: { id: payload.patient.id },
        });
        if (!result) {
            return res.status(500).json({
                message: "Can't update personal info !!!",
            });
        }
        const afterUpdateData = await Patient.findOne({
            where: {id: payload.patient.id}
        })
        res.status(200).json({
            result: 1,
            msg: "Update personal info successfully",
            data: {
                id: afterUpdateData.id,
                email: afterUpdateData.email,
                phone: afterUpdateData.phone,
                name: afterUpdateData.name,
                description: afterUpdateData.description,
                price: afterUpdateData.price,
                role: afterUpdateData.role,
                active: afterUpdateData.active,
                avatar: afterUpdateData.avatar,
                create_at: afterUpdateData.create_at,
                update_at: afterUpdateData.update_at,
                speciality_id: afterUpdateData.speciality_id,
                room_id: afterUpdateData.room_id,
                recovery_token: afterUpdateData.recovery_token,
            }
        });
    } else if (req.body.action === "avatar") {
        const urlObj = {
            avatar: req.body.url,
        };
        const result = await Patient.update(urlObj, { where: { id: payload.patient.id } });
        if (!result) {
            return res.status(500).json({
                message: "Can't update avatar !!!",
            });
        }
        const afterUpdateData = await Patient.findOne({
            where: {id: payload.patient.id}
        })
        res.status(200).json({
            result: 1,
            msg: "Update avatar successfully",
            data: {
                id: afterUpdateData.id,
                email: afterUpdateData.email,
                phone: afterUpdateData.phone,
                name: afterUpdateData.name,
                description: afterUpdateData.description,
                price: afterUpdateData.price,
                role: afterUpdateData.role,
                active: afterUpdateData.active,
                avatar: afterUpdateData.avatar,
                create_at: afterUpdateData.create_at,
                update_at: afterUpdateData.update_at,
                speciality_id: afterUpdateData.speciality_id,
                room_id: afterUpdateData.room_id,
                recovery_token: afterUpdateData.recovery_token,
            }
        });
    } else if(req.body.action === "password"){
        const result = await Patient.findOne({
            where: {id: payload.patient.id}
        })
        /* Check xem mật khẩu nhập vào đã đúng chưa */
        if(result.password !== req.body.currentPassword){
            return res.status(400).json({
                result: 0,
                msg: "Wrong password , please re-enter"
            })
        }
        try{
            const isUpdatePassword = await Patient.update({password: req.body.newPassword},{
                where: {id: payload.patient.id}
            })
            if (isUpdatePassword){
                const afterUpdateData = await Patient.findOne({
                    where: {id: payload.patient.id}
                })
                res.status(200).json({
                    result: 1,
                    msg: "Update password successfully",
                    data: {
                        id: afterUpdateData.id,
                        email: afterUpdateData.email,
                        phone: afterUpdateData.phone,
                        name: afterUpdateData.name,
                        description: afterUpdateData.description,
                        price: afterUpdateData.price,
                        role: afterUpdateData.role,
                        active: afterUpdateData.active,
                        avatar: afterUpdateData.avatar,
                        create_at: afterUpdateData.create_at,
                        update_at: afterUpdateData.update_at,
                        speciality_id: afterUpdateData.speciality_id,
                        room_id: afterUpdateData.room_id,
                        recovery_token: afterUpdateData.recovery_token,
                    }
                })
            }
        } catch(err){
            res.status(500).json({
                result: 0,
                msg: err.message || "Some error occurred when update password"
            });
        }
    }
};
module.exports = ChangePatientProfileController;