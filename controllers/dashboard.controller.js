const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");
const Appointment = require("../models/appointment.model");
const Booking = require("../models/booking.model");
const { appointment_status } = require("../enum/index");
const dotenv = require("dotenv");
dotenv.config();

const DashboardController = async (data, req, res, next) => {
  try {
    const token = jwt.decode(data);
    const user = await Doctor.findOne({
      where: { id: token.doctor.id },
    });
    const doctors = await Doctor.findAll({});
    const appointments = await Appointment.findAll({
      where: { doctor_id: user.id },
    });
    const bookings = await Booking.findAll({
      where: { doctor_id: user.id },
    });
    const cancelAppointments = await Appointment.findAll({
      where: { doctor_id: user.id, status: appointment_status.CANCEL },
    });
    res.status(200).json({
      result: 1,
      msg: "Welcome to Umbrella corporation",
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        description: user.description,
        price: user.price,
        role: user.role,
        active: user.active,
        avatar: user.avatar,
        create_at: user.create_at,
        update_at: user.update_at,
        speciality_id: user.speciality_id,
        room_id: user.room_id,
        recovery_token: user.recovery_token,
      },
      doctors: doctors.length,
      appointments: appointments.length,
      bookings: bookings.length,
      cancelAppoinments: cancelAppointments.length,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

module.exports = DashboardController;
