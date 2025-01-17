const Booking = require("../models/booking.model");
const Appointment = require("../models/appointment.model");
const Service = require("../models/service.model");
const Patient = require("../models/patient.model");
const Speciality = require("../models/speciality.model");
const Room = require("../models/room.model");
const BookingPhoto = require("../models/bookingPhoto.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { booking_status } = require("../enum");
const moment = require("moment");
const { createAppointment } = require("../controllers/appointment.controller");
const {
  createNotification,
} = require("../controllers/notification.controller");
const { Op } = require("sequelize");
const Doctor = require("../models/doctor.model");
const defaultSize = 1000000;

const createBooking = async (result, req, res, next) => {
  try {
    const payload = jwt.decode(result);
    const user = await Patient.findByPk(payload.patient.id);
    /* Kiểm tra thơì gian booking tránh bị trùng lặp */
    const appointment_time = req.body.appointment_time;
    const appointmentDate = appointment_time?.split(" ")[0];
    const appointmentHour = appointment_time?.split(" ")[1];
    const isExistBookingInThisTime = await Booking.findAll({
      where: {
        patient_id: payload.patient.id,
        appointment_date: appointmentDate,
        appointment_hour: appointmentHour,
        status: {
          [Op.ne]: booking_status.CANCEL, // Sequelize operator for 'not equal'
        },
      },
    });
    if (isExistBookingInThisTime.length !== 0) {
      console.log(`Please choose another time booking`);
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

    // if (
    //   doctorAppointmentTimeAvailable(
    //     request.doctor_id,
    //     request.appointment_date,
    //     request.appointment_hour
    //   ) == false
    // ) {
    //   return {
    //     success: 0,
    //     msg: "Doctor isn't available during this time",
    //   };
    // }

    // if (
    //   getDoctorAppointmentNumber(request.doctor_id, request.appointment_date) >
    //   appointment_number_threshold
    // ) {
    //   return {
    //     success: 0,
    //     msg: "Doctor has too many appointments in this day",
    //   };
    // }

    // if (
    //   !checkDoctorServiceCompatible(service.id, appointment_values.doctor_id)
    // ) {
    //   return {
    //     success: 0,
    //     msg: "Doctor is not available for this service",
    //   };
    // }

    const data = await Booking.create(request);
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: "Error ! Can't be booking , please try again",
      });
    }
    if (data) {
      var service = null;
      if (data.service_id) {
        service = await Service.findOne({
          where: { id: data.service_id },
        });
      }
      await createNotification(user.id, {
        message: `Xin chúc mừng, ${user?.name} ! Bạn đã thành công đặt lịch hẹn ngày ${request.appointment_date} vào lúc ${request.appointment_hour}\nLịch hẹn của bạn sẽ được chúng tôi xem xét phê duyệt, vui lòng chờ`,
        record_type: "booking",
        record_id: data.id,
      });
      return res.status(200).json({
        result: 1,
        msg: `Congratulations, ${user?.name} ! This booking at ${request.appointment_date} ${request.appointment_hour} which has been created succesfully by you`,
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
            id: service ? data.service_id : 0,
            name: service ? service.name : "",
            image: service ? service.image : "",
          },
        },
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
const deleteBooking = async (data, req, res, next) => {
  try {
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
        return res.status(404).json({
          result: 0,
          msg: "This booking not exist",
        });
      }
      if (requestBooking.status === booking_status.CANCEL) {
        return res.status(400).json({
          result: 1,
          msg: "This booking's status is cancelled . No need any more action !",
        });
      } else if (requestBooking.status === booking_status.PROCESSING) {
        await Booking.update(
          { status: booking_status.CANCEL },
          {
            where: { id: id },
          }
        );
        return res.status(200).json({
          result: 1,
          msg: "Booking has been cancelled successfully !",
        });
      }
    } else {
      return res.status(400).json({
        result: 0,
        msg: "You don't allow to delete booking because you not have permission",
      });
    }
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
const readAllBooking = async (data, req, res, next) => {
  try {
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
        console.log("Error ! Can't get all booking");
        return res.status(500).json({
          result: 0,
          msg: "Error ! Can't get all bookings ",
        });
      }
      return res.status(200).json({
        result: 1,
        quantity: result.length,
        data: await Promise.all(
          result.map(async (item) => {
            var service = null;
            if (item?.service_id) {
              service = await Service.findOne({
                where: { id: item?.service_id },
              });
            }
            const patient = await Patient.findOne({
              where: {id: item.patient_id}
            })
            const doctor = await Doctor.findOne({
              where: {id: item.doctor_id}
            })
            const findService = await Service.findOne({
              where: {id: item.service_id}
            })
            const room = await Room.findOne({
              where: {id: findService.room_id}
            })
            const speciality = await Speciality.findOne({
              where: {id: findService.speciality_id}
            })
            const booking_photos = await BookingPhoto.findAll({
              where: {booking_id: item.id}
            })
            return {
              id: item.id,
              doctor_id: item.doctor_id,
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
                id: service ? item.service_id : 0,
                name: service ? service.name : "",
                image: service ? service.image : "",
              },
              patient: patient,
              doctor: doctor,
              room: room,
              speciality: speciality,
              booking_photo: booking_photos
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
        console.log("Error ! Can't get all booking");
        return res.status(500).json({
          result: 0,
          msg: "Error ! Don't get all booking of you",
        });
      }
      return res.status(200).json({
        result: 1,
        quantity: result.length,
        data: await Promise.all(
          result.map(async (item) => {
            var service = null;
            if (item?.service_id) {
              service = await Service.findOne({
                where: { id: item?.service_id },
              });
            }
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
                id: service ? item.service_id : 0,
                name: service ? service.name : "",
                image: service ? service.image : "",
              },
            };
          })
        ),
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};
const readBookingById = async (data, req, res, next) => {
  try {
    const id = req.params.id;
    const requestBooking = await Booking.findOne({
      where: { id: id },
    });
    if (
      jwt.decode(data).hasOwnProperty("doctor") &&
      jwt.decode(data).doctor.role !== "doctor"
    ) {
      if (!requestBooking) {
        return res.status(404).json({
          result: 0,
          msg: "This booking not exist",
        });
      }
      var service = null;
      if (requestBooking?.service_id) {
        service = await Service.findOne({
          where: { id: requestBooking?.service_id },
        });
      }
      const doctor = await Doctor.findByPk(requestBooking.doctor_id);
      return res.status(200).json({
        result: 1,
        msg: "Action successfully !",
        data: {
          id: requestBooking.id,
          booking_name: requestBooking.booking_name,
          booking_phone: requestBooking.booking_phone,
          doctor: doctor
            ? {
                id: doctor.id,
                name: doctor.name,
                avatar: doctor.avatar,
              }
            : null,
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
            id: service ? requestBooking.service_id : 0,
            name: service ? service.name : "",
            image: service ? service.image : "",
          },
        },
      });
    } else if (jwt.decode(data).hasOwnProperty("patient")) {
      if (requestBooking.patient_id === jwt.decode(data).patient.id) {
        if (!requestBooking) {
          return res.status(404).json({
            result: 0,
            msg: "This booking not exist",
          });
        }
        var service = null;
        if (requestBooking?.service_id) {
          service = await Service.findOne({
            where: { id: requestBooking?.service_id },
          });
        }
        const doctor = await Doctor.findByPk(requestBooking.doctor_id);
        return res.status(200).json({
          result: 1,
          msg: "Action successfully !",
          data: {
            id: requestBooking.id,
            booking_name: requestBooking.booking_name,
            booking_phone: requestBooking.booking_phone,
            doctor: doctor
              ? {
                  id: doctor.id,
                  name: doctor.name,
                  avatar: doctor.avatar,
                }
              : null,
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
              id: service ? requestBooking.service_id : 0,
              name: service ? service.name : "",
              image: service ? service.image : "",
            },
          },
        });
      } else {
        return res.status(404).json({
          result: 0,
          msg: "Not available this booking",
        });
      }
    }
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const updateBooking = (result, req, res, next) => {
  try {
    const id = req.params.id;
    Booking.update(req.body, {
      where: { id: id },
    })
      .then((data) => {
        if (data == 1)
          return res.status(200).json({
            msg: "Booking was updated successfully.",
          });
      })
      .catch((err) => {
        return res.status(500).json({
          msg: `Cannot update Booking with id=${id}`,
        });
      });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const confirmBooking = async (req, res) => {
  try {
    const access_token = req.headers["authorization"];
    const token = access_token.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (
      !payload.hasOwnProperty("doctor") ||
      (payload.doctor.role !== "supporter" && payload.doctor.role !== "admin")
    ) {
      return res.status(400).json({
        result: 0,
        msg: "Not allowed to perform this action",
      });
    }

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
        .then(async (data) => {
          const user = await Patient.findByPk(booking.patient_id);
          if (data == 1) {
            await createNotification(user?.id, {
              message: `Xin chúc mừng, ${user?.name} ! Lịch hẹn vào lúc ${booking.appointment_date} ${booking.appointment_hour} đã được chúng tôi xác nhận\nXin hãy vui lòng sắp xếp thời gian để tới khám đúng lịch`,
              record_type: "appointment",
              record_id: appointment.id,
            });
            return res.status(200).json({
              success: 1,
              msg: "Booking was confirmed successfully.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: 0,
            msg: `Cannot confirm Booking with id=${id}`,
          });
        });
    } else {
      return res.status(500).json(response_appointment);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      result: 0,
      msg: e.message,
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
