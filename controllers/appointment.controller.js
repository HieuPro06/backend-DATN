const Appointment = require("../models/appointment.model.js");
const Doctor = require("../models/doctor.model.js");
const { appointment_status } = require("../enum");
const defaultSize = 10;
const defaultSort = "id";
const defaultDirection = "ASC";
const condition_active = { status: appointment_status.PROCESSING };

const getAppointmentAll = (data,req,res,next) => {
  const { size, page } = req.body;

  const limit = size ? size : defaultSize;
  const offset = page ? (page - 1) * limit : 0;
  const condition = condition_active;

  Appointment.findAll({
    where: condition,
    limit: limit,
    offset: offset,
    // order: sorting.sortQuery(req, defaultSort, defaultDirection),
  })
    .then((data) => {
      res.send({
        data: data ? data : [],
        count: data ? data.length : 0,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving appointment list.",
      });
    });
};

const getAppointmentByID = (data,req,res,next) => {
  const id = req.params.id;

  Appointment.findByPk(id)
    .then((data) => {
      res.send({
        data: data ? data : [],
        count: data ? data.length : 0,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointment.",
      });
    });
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

  if (appointment_values.doctor_id == null) {
    const appointDoctor = await doctorAutoAppoint(
      appointment_values.date,
      appointment_values.appointment_time
    );
    if (appointDoctor != null) {
      appointment_values.doctor_id = appointDoctor.id;
    }
  } else {
    if (
      doctorAppointmentTimeAvailable(
        appointment_values.doctor_id,
        appointment_values.date,
        appointment_values.time
      ) == false
    ) {
      return null;
    }
  }

  if (appointment_values.numerical_order == null) {
    appointment_values.numerical_order = getNumericalOrder().id;
  }

  console.log(appointment_values);

  const appointment = await Appointment.create(appointment_values);

  return appointment;
};

const updateAppointment = (req,res) => {
  const id = req.params.id;

  Appointment.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data == 1)
        res.send({
          message: "Appointment was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot update Appointment with id=${id}`,
      });
    });
};

const deleteAppointment = async (req,res) => {
  const id = req.params.id;

  Appointment.update(
    { active: 0 },
    {
      where: { id: id, status: appointment_status.CANCEL },
    }
  )
    .then((data) => {
      if (data == 1)
        res.send({
          message: "Appointment was removed successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot remove Appointment with id=${id}`,
      });
    });
};

// Check xem 1 bác sĩ đc chỉ định có rảnh trong thời gian được chỉ định không
const doctorAppointmentTimeAvailable = async (doctor_id, date, time) => {
  condition = { date: date, appointment_time: time, doctor_id: doctor_id };

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
const doctorAutoAppoint = async (date, time) => {
  allDoctors = await Doctor.findAll();
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

const getNumericalOrder = async () => {
  number = Appointment.count();
  return number + 1;
};

module.exports = {
  getAppointmentAll,
  getAppointmentByID,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getNumericalOrder,
};
