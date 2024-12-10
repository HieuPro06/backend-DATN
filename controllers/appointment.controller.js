const Appointment = require("../models/appointment.model.js");
const Doctor = require("../models/doctor.model.js");
const {appointment_status} = require("../enum");
const DoctorAndService = require("../models/doctorAndService.model.js");
const {where} = require("sequelize");
const Booking = require("../models/booking.model.js");
const jwt = require("jsonwebtoken");
const {
    checkDoctorServiceCompatible,
} = require("./doctorAndService.controller.js");
const defaultSize = 10;
const defaultSort = "id";
const defaultDirection = "ASC";
const condition_active = {status: appointment_status.PROCESSING};
const {Op} = require("sequelize");

const appointment_number_threshold = 20;

const getAppointmentAll = async (data, req, res, next) => {
    const token = jwt.decode(data);
    const {size, page} = req.body;
    const limit = size ? size : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    const condition = condition_active;
    if (token.hasOwnProperty("doctor")) {
        if (token.doctor.role === "doctor") {
            const doctorId = token.doctor.id;
            try {
                const appointments = await Appointment.findAll({
                    where: {doctor_id: doctorId}
                })
                if (appointments) {
                    return res.status(200).json({
                        result: 1,
                        msg: "Get all appointments successfully",
                        data: appointments
                    })
                }
            } catch (e) {
                return res.json(500).json({
                    result: 0,
                    msg: e
                })
            }
        } else {
            Appointment.findAll({
                limit: limit,
                offset: offset,
                // where: condition,
                // order: sorting.sortQuery(req, defaultSort, defaultDirection),
            })
                .then((data) => {
                    return res.status(200).json({
                        result: 1,
                        msg: "Get all appointments successfully",
                        data: data,
                    });
                })
                .catch((err) => {
                    return res.status(500).json({
                        msg:
                            err.message ||
                            "Some error occurred while retrieving appointment list.",
                    });
                });
        }
    } else {
        const patientId = token.patient.id;
        try {
            const appointments = await Appointment.findAll({
                where: {patient_id: patientId}
            })
            if (appointments) {
                return res.status(200).json({
                    result: 1,
                    msg: "Get all appointments successfully",
                    data: appointments
                })
            }
        } catch (e) {
            return res.status(500).json({
                result: 0,
                msg: e
            })
        }
    }
};

const getAppointmentByID = async (data, req, res, next) => {
    const token = jwt.decode(data);
    const id = req.params.id;

    if (token.hasOwnProperty("doctor")) {
        Appointment.findByPk(id)
            .then((data) => {
                return res.status(200).json({
                    data: data ? data : [],
                    count: data ? data.length : 0,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    msg: err.message || "Some error occurred while retrieving appointment.",
                });
            });
    } else {
        try{
            const appointment = await Appointment.findByPk(id);
            const appoitmentQueue = await Appointment.findAll({
                where: {doctor_id: appointment.doctor_id}
            })
            if(appointment && appoitmentQueue){
                return res.status(200).json({
                    result: 1,
                    msg: "Get appointment by id successfully",
                    data: appointment,
                    appointment_queue: appoitmentQueue
                })
            }
        } catch (e) {
            return res.status(500).json({
                result: 0,
                msg: e
            })
        }
    }
};

const createAppointment = async (req, res) => {
    var appointment_values = {
        booking_id: req.body.booking_id,
        doctor_id: req.body.doctor_id || null,
        patient_id: req.body.patient_id,
        patient_name: req.body.patient_name,
        patient_birthday: req.body.patient_birthday,
        patient_reason: req.body.patient_reason,
        patient_phone: req.body.patient_phone,
        numerical_order: req.body.numerical_order || null,
        position: req.body.position || null,
        appointment_time: req.body.appointment_time,
        date: req.body.date,
        status: appointment_status.PROCESSING,
        create_at: new Date(), // automatically set the current date and time
        update_at: new Date(), // automatically set the current date and time
    };

    // Biến chỉ định bắt buộc tạo (áp dụng sau khi xác nhận vẫn tạo khi có pop up lỗi)
    const force_create = req.body.force_create ? req.body.force_create : false;

    const bookingRec = await Booking.findByPk(req.body.booking_id);
    const service_id = bookingRec.service_id ? bookingRec.service_id : null;
    var appointDoctor = null;
    var appoint_id = 0;
    if (appointment_values.doctor_id == null) {
        appointDoctor = await doctorAutoAppoint(
            appointment_values.date,
            appointment_values.appointment_time,
            service_id
        );
        if (appointDoctor != null) {
            appoint_id = appointDoctor.id;
        }
    } else {
        if (!force_create) {
            if (
                doctorAppointmentTimeAvailable(
                    appointment_values.doctor_id,
                    appointment_values.date,
                    appointment_values.appointment_time
                ) == false
            ) {
                return {
                    appointment: null,
                    success: 0,
                    msg: "Doctor isn't available during this time",
                    error_type: 1, // Xác định kiểu lỗi: tạo pop-up lỗi, k có xác nhận nào khác
                    previous_request: req,
                };
            }

            if (
                getDoctorAppointmentNumber(
                    appointment_values.doctor_id,
                    appointment_values.date
                ) > appointment_number_threshold
            ) {
                return {
                    appointment: null,
                    success: 0,
                    msg: "Doctor has too many appointments in this day",
                    error_type: 2, // Xác định kiểu lỗi, tạo pop-up lỗi yêu cầu xác nhận tạo appointment hay k
                    previous_request: null,
                };
            }

            if (
                !checkDoctorServiceCompatible(service_id, appointment_values.doctor_id)
            ) {
                return {
                    appointment: null,
                    success: 0,
                    msg: "Doctor is not available for this service",
                    error_type: 1,
                    previous_request: null,
                };
            }
        }
        appoint_id = appointment_values.doctor_id;
    }

    if (appointment_values.numerical_order == null) {
        appointment_values.numerical_order = await getNumericalOrder(
            appointment_values.date
        );
    }
    if (appointment_values.position == null) {
        appointment_values.position = appointment_values.numerical_order;
    }

    if (appoint_id == 0)
        return {
            appointment: null,
            success: 0,
            msg: "No available doctors",
            error_type: 1,
            previous_request: null,
        };
    else {
        appointment_values.doctor_id = appoint_id;
    }

    const appointment = await Appointment.create(appointment_values);

    if (appointment == null)
        return {
            appointment: null,
            success: 0,
            msg: "Create appointment failed",
            error_type: 1,
            previous_request: null,
        };

    return {
        appointment: appointment,
        success: 1,
        msg: "Appointment has been created!",
        error_type: null,
        previous_request: null,
    };
};

const updateAppointment = (info, req, res, next) => {
    const id = req.params.id;
    Appointment.update(req.body, {
        where: {id: id},
    })
        .then((data) => {
            if (data == 1)
                return res.status(200).json({
                    result: 1,
                    msg: "Appointment was updated successfully.",
                });
        })
        .catch((err) => {
            return res.status(500).json({
                result: 0,
                msg: err.message,
            });
        });
};

const deleteAppointment = async (req, res) => {
    const id = req.params.id;
    Appointment.update(
        {status: appointment_status.CANCEL},
        {
            where: {id: id},
        }
    )
        .then((data) => {
            if (data == 1)
                return res.status(200).json({
                    result: 1,
                    msg: "Appointment was canceled successfully.",
                });
        })
        .catch((err) => {
            return res.status(500).json({
                result: 0,
                msg: err.message,
            });
        });
};

// Check xem 1 bác sĩ đc chỉ định có rảnh trong thời gian được chỉ định không
const doctorAppointmentTimeAvailable = async (doctor_id, date, time) => {
    condition = {date: date, appointment_time: time, doctor_id: doctor_id};

    // Tìm Appointment đã trùng, nếu tìm đc thì bác sĩ bị trùng lịch, trả về false
    const existingAppointments = await Appointment.findOne({
        where: condition,
    });

    if (existingAppointments) {
        return false;
    } else {
        return true;
    }
};

const getDoctorAppointmentNumber = async (doctor_id, date) => {
    const appointmentNumber = await Appointment.count({
        where: {
            doctor_id: doctor_id,
            date: date,
        },
    });
    return appointmentNumber;
};

// Tự động chỉ định 1 bác sĩ cho Appointment, theo các mức ưu tiên về trạng thái bác sĩ
const doctorAutoAppoint = async (date, time, service_id) => {
    var condition = {};
    if (service_id != null) {
        condition = {...condition, service_id: service_id};
    }
    const doctorServices = await DoctorAndService.findAll({where: condition});

    const doctorIds = doctorServices.map(
        (doctorService) => doctorService.doctor_id
    );

    if (doctorIds.length === 0) {
        return null;
    }

    allDoctors = await Doctor.findAll({where: {id: {[Op.in]: doctorIds}}});
    var min = 100;
    var minDoctor = null;
    for (var doctor of allDoctors) {
        if (doctorAppointmentTimeAvailable(doctor.id, date, time)) {
            const appNum = await getDoctorAppointmentNumber(doctor.id, date);
            if (appNum < min) {
                min = appNum;
                minDoctor = doctor;
            }
        }
    }
    return minDoctor;
};

const getNumericalOrder = async (date) => {
    number = await Appointment.count({
        where: {
            date: date,
        },
    });
    return number + 1;
};

const orderAppointments = async (req, res) => {
    const request = req.body;
    // console.log(request)
    for (var value of request) {
        const data = await Appointment.update(
            {position: value.position},
            {
                where: {numerical_order: value.numberOrder},
            }
        );
        if (!data) {
            return res.status(500).json({
                result: 0,
                msg: "Can't order appointments",
            });
        }
    }
};

module.exports = {
    getAppointmentAll,
    getAppointmentByID,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getNumericalOrder,
    orderAppointments,
};
