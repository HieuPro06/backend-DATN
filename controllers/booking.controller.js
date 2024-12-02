const Booking = require("../models/booking.model");
const Service = require("../models/service.model");
const jwt = require("jsonwebtoken");
const { booking_status } = require("../enum");
const moment = require("moment");
const { createAppointment } = require("../controllers/appointment.controller");

const defaultSize = 1000000;

const createBooking = async (result, req, res, next) => {
  const payload = jwt.decode(result);
  /* Kiểm tra thơì gian booking tránh bị trùng lặp */
  const appointment_time = req.body.appointment_time;
  const appointmentDate = appointment_time?.split(" ")[0];
  const appointmentHour = appointment_time?.split(" ")[1];
  const isExistBookingInThisTime = await Booking.findAll({
    where: {
      patient_id: payload.patient.id,
      appointment_date: appointmentDate,
      appointment_hour: appointmentHour,
    },
  });
  if (isExistBookingInThisTime.length !== 0) {
    return res.status(400).json({
      result: 0,
      msg: `Please choose another time booking , had at least booking with this time ${appointmentDate} ${appointmentHour}`,
    });
  }
  const request = {
    service_id: req.body.service_id,
    patient_id: req.body.patient_id,
    doctor_id: req.body.doctor_id,
    booking_name: req.body.booking_name,
    booking_phone: req.body.booking_phone,
    name: req.body.name,
    gender: req.body.gender,
    birthday: req.body.birthday,
    address: req.body.address,
    reason: req.body.reason,
    appointment_date: appointmentDate,
    appointment_hour: appointmentHour,
    create_at: Date.now(),
    update_at: Date.now(),
    status: booking_status.PROCESSING,
  };
  const data = await Booking.create(request);
  if (!data) {
    res.status(500).json({
      result: 0,
      msg: "Error ! Can't be booking , please try again",
    });
  }
  const service = await Service.findOne({
    where: { id: data?.service_id },
  });
  res.status(200).json({
    result: 1,
    msg: `Congratulations . ${request.booking_name} ! This booking at ${request.appointment_date} ${request.appointment_hour} which has been created succesfully by you`,
    data: {
      id: data.id,
      booking_name: data.booking_name,
      booking_phone: data.booking_phone,
      doctor_id: data.doctor_id,
      name: data.name,
      gender: data.gender,
      birthday: data.birthday,
      address: data.address,
      reason: data.reason,
      appointment_time: `${data.appointment_date} ${data.appointment_hour}`,
      status: data.status,
      create_at: moment().format("YYYY-MM-DD HH:MM:SS"),
      update_at: moment().format("YYYY-MM-DD HH:MM:SS"),
      service: {
        id: data.service_id,
        name: service.name,
      },
    },
  });
};
const deleteBooking = async (data, req, res, next) => {
  const payload = jwt.verify(data, process.env.JWT_SECRET);
  if (
    payload.hasOwnProperty("patient") ||
    (payload.hasOwnProperty("doctor") && payload.doctor.role !== "doctor")
  ) {
    const id = req.params.id;
    const requestBooking = await Booking.findOne({
      where: { id: id },
    });
    if (!requestBooking) {
      res.status(404).json({
        result: 0,
        msg: "This booking not exist",
      });
    }
    if (requestBooking.status === booking_status.CANCEL) {
      res.status(400).json({
        result: 0,
        msg: "This booking's status is cancelled . No need any more action !",
      });
    } else if (requestBooking.status === booking_status.PROCESSING) {
      await Booking.update(
        { status: booking_status.CANCEL },
        {
          where: { id: id },
        }
      );
      res.status(200).json({
        result: 1,
        msg: "Booking has been cancelled successfully !",
      });
    }
  } else {
    res.status(400).json({
      result: 0,
      msg: "You don't allow to delete booking because you not have permission",
    });
  }
};
const readAllBooking = async (data, req, res, next) => {
  const { length, page } = req.params;
  const limit = length ? length : defaultSize;
  const offset = page ? (page - 1) * limit : 0;
  /* Lấy ra toàn bộ thông tin booking cho bác sĩ */
  if (
    jwt.decode(data).hasOwnProperty("doctor") &&
    jwt.decode(data).doctor.role !== "doctor"
  ) {
    const result = await Booking.findAll({
      limit: limit,
      offset: offset,
    });
    if (!result) {
      res.status(500).json({
        result: 0,
        msg: "Error ! Can't get all bookings ",
      });
    }
    res.status(200).json({
      result: 1,
      quantity: result.length,
      data: await Promise.all(
        result.map(async (item) => {
          const service = await Service.findOne({
            where: { id: item?.service_id },
          });
          return {
            id: item.id,
            booking_name: item.booking_name,
            booking_phone: item.booking_phone,
            name: item.name,
            gender: item.gender,
            birthday: item.birthday,
            address: item.address,
            reason: item.reason,
            appointment_time: `${item.appointment_date} ${item.appointment_hour}`,
            status: item.status,
            create_at: moment().format("YYYY-MM-DD HH:MM:SS"),
            update_at: moment().format("YYYY-MM-DD HH:MM:SS"),
            service: {
              id: item.service_id,
              name: service.name,
            },
          };
        })
      ),
    });
  } else if (jwt.decode(data).hasOwnProperty("patient")) {
    /* Lấy ra toàn bộ thông tin booking cho bác sĩ */
    const patientId = jwt.decode(data).patient.id;
    const result = await Booking.findAll({
      where: { patient_id: patientId },
    });
    if (!result) {
      res.status(500).json({
        result: 0,
        msg: "Error ! Don't get all booking of you",
      });
    }
    res.status(200).json({
      result: 1,
      quantity: result.length,
      data: await Promise.all(
        result.map(async (item) => {
          const service = await Service.findOne({
            where: { id: item?.service_id },
          });
          return {
            id: item.id,
            booking_name: item.booking_name,
            booking_phone: item.booking_phone,
            name: item.name,
            gender: item.gender,
            birthday: item.birthday,
            address: item.address,
            reason: item.reason,
            appointment_time: `${item.appointment_date} ${item.appointment_hour}`,
            status: item.status,
            create_at: moment().format("YYYY-MM-DD HH:MM:SS"),
            update_at: moment().format("YYYY-MM-DD HH:MM:SS"),
            service: {
              id: item.service_id,
              name: service.name,
            },
          };
        })
      ),
    });
  }
};
const readBookingById = async (data, req, res, next) => {
  const id = req.params.id;
  const requestBooking = await Booking.findOne({
    where: { id: id },
  });
  if (
    jwt.decode(data).hasOwnProperty("doctor") &&
    jwt.decode(data).doctor.role !== "doctor"
  ) {
    if (!requestBooking) {
      res.status(404).json({
        result: 0,
        msg: "This booking not exist",
      });
    }
    const service = await Service.findOne({
      where: { id: requestBooking?.service_id },
    });
    res.status(200).json({
      result: 1,
      msg: "Action successfully !",
      data: {
        id: requestBooking.id,
        booking_name: requestBooking.booking_name,
        booking_phone: requestBooking.booking_phone,
        name: requestBooking.name,
        gender: requestBooking.gender,
        birthday: requestBooking.birthday,
        address: requestBooking.address,
        reason: requestBooking.reason,
        appointment_time: `${requestBooking.appointment_date} ${requestBooking.appointment_hour}`,
        status: requestBooking.status,
        create_at: moment().format("YYYY-MM-DD HH:MM:SS"),
        update_at: moment().format("YYYY-MM-DD HH:MM:SS"),
        service: {
          id: requestBooking.service_id,
          name: service.name,
        },
      },
    });
  } else if (jwt.decode(data).hasOwnProperty("patient")) {
    if (requestBooking.patient_id === jwt.decode(data).patient.id) {
      if (!requestBooking) {
        res.status(404).json({
          result: 0,
          msg: "This booking not exist",
        });
      }
      const service = await Service.findOne({
        where: { id: requestBooking?.service_id },
      });
      res.status(200).json({
        result: 1,
        msg: "Action successfully !",
        data: {
          id: requestBooking.id,
          booking_name: requestBooking.booking_name,
          booking_phone: requestBooking.booking_phone,
          name: requestBooking.name,
          gender: requestBooking.gender,
          birthday: requestBooking.birthday,
          address: requestBooking.address,
          reason: requestBooking.reason,
          appointment_time: `${requestBooking.appointment_date} ${requestBooking.appointment_hour}`,
          status: requestBooking.status,
          create_at: moment().format("YYYY-MM-DD HH:MM:SS"),
          update_at: moment().format("YYYY-MM-DD HH:MM:SS"),
          service: {
            id: requestBooking.service_id,
            name: service.name,
          },
        },
      });
    } else {
      res.status(404).json({
        result: 0,
        msg: "Not available this booking",
      });
    }
  }
};

const updateBooking = (result, req, res, next) => {
  const id = req.params.id;
  Booking.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data == 1)
        res.send({
          message: "Booking was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot update Booking with id=${id}`,
      });
    });
};

const confirmBooking = async (data, req, res, next) => {
  const auth = jwt.decode(data);
  if (!auth.hasOwnProperty("doctor")) {
    const id = req.params.id;
    var new_req = req;
    const booking = await Booking.findByPk(id);
    new_req.body = {
      booking_id: id,
      doctor_id: req.body.doctor_id || null,
      patient_id: booking.patient_id,
      patient_name: booking.name,
      patient_birthday: booking.birthday,
      patient_reason: booking.reason,
      patient_phone: booking.booking_phone,
      numerical_order: null,
      position: null,
      appointment_time: booking.appointment_hour,
      date: booking.appointment_date || null,
      status: null,
      create_at: new Date(), // automatically set the current date and time
      update_at: new Date(), // automatically set the current date and time
    };
    const response_appointment = await createAppointment(new_req, res);

    const appointment = response_appointment.appointment;

    if (appointment != null) {
      Booking.update(
        {
          status: booking_status.VERIFIED,
        },
        { where: { id: id } }
      )
        .then((data) => {
          if (data == 1)
            res.send({
              success: 1,
              message: "Booking was confirmed successfully.",
            });
        })
        .catch((err) => {
          res.status(500).send({
            success: 0,
            message: `Cannot confirm Booking with id=${id}`,
          });
        });
    } else {
      res.status(500).send(response_appointment);
    }
  } else {
    res.status(404).json({
      result: 0,
      message: "Action not available",
    });
  }
};

module.exports = {
  createBooking,
  deleteBooking,
  readAllBooking,
  readBookingById,
  updateBooking,
  confirmBooking,
};
