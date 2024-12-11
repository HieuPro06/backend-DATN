const AppointmentRecord = require("../models/appointment-record.model");
const Appointment = require("../models/appointment.model");
const defaultSize = 1000000;
const jwt = require("jsonwebtoken");
const createNewAppointmentRecord = async (req, res) => {
    try {
        const request = {
            appointment_id: req.body.appointment_id,
            reason: req.body.reason,
            description: req.body.description,
            status_before: req.body.status_before,
            status_after: req.body.status_after,
            create_at: Date.now(),
            update_at: Date.now(),
        };
        const data = await AppointmentRecord.create(request);
        if (!data) {
            return res.status(500).json({
                result: 0,
                msg: "Can't create new appointment record",
            });
        }
        return res.status(200).json({
            result: 1,
            msg: "Create appointment record successfully",
            data: data,
        });
    } catch (e) {
        return res.status(500).json({
            result: 0,
            msg: e.message,
        });
    }
};
const getAppointmentRecord = async (info, req, res, next) => {
    const appointmentId = req.params.id;
    const data = await AppointmentRecord.findOne({
        where: {appointment_id: appointmentId},
    });
    if (!data) {
        return res.status(500).json({
            result: 0,
            msg: "Can't get appointment record",
        });
    } else {
        return res.status(200).json({
            result: 1,
            msg: "Get appointment record successfully",
            data: data,
        });
    }
};
const updateAppointmentRecord = async (req, res) => {
    const id = req.params.id;
    const request = {
        reason: req.body.reason,
        description: req.body.description,
        status_before: req.body.status_before,
        status_after: req.body.status_after,
        update_at: Date.now(),
    };
    try {
        const result = await AppointmentRecord.update(request, {
            where: {id: id},
        });
        if (result) {
            const afterUpdateData = await AppointmentRecord.findOne({
                where: {id: id},
            });
            return res.status(200).json({
                result: 1,
                msg: "Update appointment-record successfully",
                data: afterUpdateData,
            });
        }
    } catch (e) {
        return res.status(500).json({
            result: 0,
            msg: e.message || "Some error occur when update appointment-record",
        });
    }
};
const getAllAppointmentRecords = async (info, req, res, next) => {
    const token = jwt.decode(info);
    const {length, page} = req.body;
    const limit = length ? length : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    if (token.hasOwnProperty("doctor")) {
        try {
            const appointments = await Appointment.findAll({
                where: {doctor_id: token.doctor.id}
            })
            const result = await Promise.all(appointments.map(async (item) => {
                const kq = await AppointmentRecord.findOne({
                    limit: limit,
                    offset: offset,
                    where: {appointment_id: item.id}
                })
                if(kq !== null){
                    return {...kq.dataValues,
                        patient_name: item.patient_name,
                        numerical_order: item.numerical_order
                    };
                }
            }))
            return res.status(200).json({
                result: 1,
                msg: "Get all appointment-record successfully",
                quantity: result.length,
                data: result,
            });
        } catch (e) {
            return res.status(500).json({
                result: 0,
                msg: e.message || "Some error occur when get all appointment-records",
            });
        }
    } else {
        try {
            const appointments = await Appointment.findAll({
                where: {patient_id: token.patient.id}
            })
            const result = await Promise.all(appointments.map(async (item) => {
                const kq = await AppointmentRecord.findOne({
                    limit: limit,
                    offset: offset,
                    where: {appointment_id: item.id}
                })
                if(kq !== null){
                    return {...kq.dataValues,
                        patient_name: item.patient_name,
                        numerical_order: item.numerical_order
                    };
                }
            }))
            return res.status(200).json({
                result: 1,
                msg: "Get all appointment-record successfully",
                quantity: result.length,
                data: result,
            });
        } catch (e) {
            return res.status(500).json({
                result: 0,
                msg: e.message || "Some error occur when get all appointment-records",
            });
        }
    }
};
const deleteAppointmentRecord = async (req, res) => {
    try {
        const data = await AppointmentRecord.destroy({
            where: {id: req.params.id},
        });
        if (data) {
            return res.status(200).json({
                result: 1,
                msg: "Remove successfully",
            });
        }
    } catch (e) {
        return res.status(500).json({
            result: 0,
            msg: e.message,
        });
    }
};
module.exports = {
    createNewAppointmentRecord,
    getAppointmentRecord,
    updateAppointmentRecord,
    getAllAppointmentRecords,
    deleteAppointmentRecord,
};
