const Treatment = require("../models/treatment.model");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/appointment.model");
const defaultSize = 1000000;

const createNewTreatment = async (req, res) => {
    try {
        const request = {
            appointment_id: req.body.appointment_id,
            name: req.body.name,
            type: req.body.type,
            times: req.body.times,
            purpose: req.body.purpose,
            instruction: req.body.instruction,
            repeat_days: req.body.repeat_days,
            repeat_time: req.body.repeat_time,
        };
        const data = await Treatment.create(request);
        if (!data) {
            return res.status(500).json({
                result: 0,
                msg: "Can't create new treatment record",
            });
        }
        return res.status(200).json({
            result: 1,
            msg: "Create treatment record successfully",
            data: data,
        });
    } catch (e) {
        return res.status(500).json({
            result: 0,
            msg: e.message,
        });
    }
};

const getTreatment = async (info, req, res, next) => {
    try {
        const appointmentId = req.params.id;
        const data = await Treatment.findOne({
            where: {appointment_id: appointmentId},
        });
        if (!data) {
            return res.status(500).json({
                result: 0,
                msg: "Can't get treatment record",
            });
        }
        return res.status(200).json({
            result: 1,
            msg: "Get treatment record successfully",
            data: data,
        });
    } catch (e) {
        return res.status(500).json({
            result: 0,
            msg: e.message,
        });
    }
};
const getAllTreatments = async (info, req, res, next) => {
    const token = jwt.decode(info);
    const {length, page} = req.body;
    const limit = length ? length : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    if (token.hasOwnProperty("doctor")) {
        if (token.doctor.role === "doctor") {
            try {
                const appointments = await Appointment.findAll({
                    where: {doctor_id: token.doctor.id}
                })
                const result = await Promise.all(appointments.map(async (item) => {
                    const kq = await Treatment.findOne({
                        limit: limit,
                        offset: offset,
                        where: {appointment_id: item.id}
                    })
                    if (kq !== null) {
                        return {
                            ...kq.dataValues,
                            patient_name: item.patient_name,
                            numerical_order: item.numerical_order
                        };
                    }
                }))
                return res.status(200).json({
                    result: 1,
                    msg: "Get all treatments successfully",
                    quantity: result.length,
                    data: result,
                });
            } catch (e) {
                return res.status(500).json({
                    result: 0,
                    msg: e.message || "Some error occur when get all treatments",
                });
            }
        } else {
            try {
                const treatments = await Treatment.findAll({
                    limit: limit,
                    offset: offset,
                });
                const result = await Promise.all(treatments.map(async (item) => {
                    const appointment = await Appointment.findOne({
                        limit: limit,
                        offset: offset,
                        where: {id: item.appointment_id}
                    })
                    if(appointment !== null){
                        return {...item.dataValues,
                            patient_name: appointment.patient_name,
                            numerical_order: appointment.numerical_order
                        };
                    }
                }))
                return res.status(200).json({
                    result: 1,
                    msg: "Get all treatments successfully",
                    quantity: result.length,
                    data: result,
                });
            } catch (e) {
                return res.status(500).json({
                    result: 0,
                    msg: e.message || "Some error occur when get all treatments",
                });
            }
        }
    } else {
        try {
            const appointments = await Appointment.findAll({
                where: {patient_id: token.patient.id}
            })
            const result = await Promise.all(appointments.map(async (item) => {
                const kq = await Treatment.findOne({
                    limit: limit,
                    offset: offset,
                    where: {appointment_id: item.id}
                })
                if (kq !== null) {
                    return {
                        ...kq.dataValues,
                        patient_name: item.patient_name,
                        numerical_order: item.numerical_order
                    };
                }
            }))
            return res.status(200).json({
                result: 1,
                msg: "Get all treatments successfully",
                quantity: result.length,
                data: result,
            });
        } catch (e) {
            return res.status(500).json({
                result: 0,
                msg: e.message || "Some error occur when get all treatments",
            });
        }
    }
};

const updateTreatment = async (req, res) => {
    const id = req.params.id;
    const request = {
        name: req.body.name,
        type: req.body.type,
        times: req.body.times,
        purpose: req.body.purpose,
        instuction: req.body.instuction,
        repeat_days: req.body.repeat_days,
        repeat_time: req.body.repeat_time,
    };
    try {
        const result = await Treatment.update(request, {
            where: {id: id},
        });
        if (result) {
            const afterUpdateData = await Treatment.findOne({
                where: {id: id},
            });
            return res.status(200).json({
                result: 1,
                msg: "Update treatment successfully",
                data: afterUpdateData,
            });
        }
    } catch (e) {
        return res.status(500).json({
            result: 0,
            msg: e.message || "Some error occur when update treatment",
        });
    }
};
const deleteTreatment = async (req, res) => {
    try {
        const data = await Treatment.destroy({
            where: {id: req.params.id},
        });
        if (data) {
            return res.status(200).json({
                result: 1,
                msg: "Remove successfully",
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            result: 0,
            msg: "Remove failed",
        });
    }
};
module.exports = {
    createNewTreatment,
    getTreatment,
    getAllTreatments,
    updateTreatment,
    deleteTreatment,
};
