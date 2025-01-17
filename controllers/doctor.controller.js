const Doctor = require("../models/doctor.model.js");
const Room = require("../models/room.model.js");
const Speciality = require("../models/speciality.model.js");
const DoctorService = require("../models/doctorAndService.model");
const Booking = require("../models/booking.model");
const Appointment = require("../models/appointment.model");
const dotenv = require("dotenv");
const Service = require("../models/service.model.js");
dotenv.config();

const defaultSize = 100;
const defaultSort = "id";
const defaultDirection = "ASC";
const condition_active = { active: 1 };

const appointment_number_threshold = 20;

const getDoctorAll = (info, req, res, next) => {
  const size = parseInt(req.query.size);
  const page = parseInt(req.query.page);

  const limit = size ? size : defaultSize;
  const offset = page ? (page - 1) * limit : 0;
  const condition = condition_active;

  Doctor.findAll({
    where: condition,
    limit: limit,
    offset: offset,
    // order: sorting.sortQuery(req, defaultSort, defaultDirection),
  })
    .then(async (data) => {
      const returnData = await Promise.all(
        data.map(async (element) => {
          const speciality = await Speciality.findByPk(
            element.dataValues.speciality_id
          );

          const service_doctor = await DoctorService.findAll({
            where: { doctor_id: element.dataValues.id },
          });
          var services = await Promise.all(
            service_doctor.map(async (pair) => {
              const service = await Service.findByPk(
                pair.dataValues.service_id
              );
              if (service)
                return {
                  id: service.dataValues.id,
                  name: service.dataValues.name,
                  image: service.dataValues.image,
                  room_id: service.dataValues.room_id,
                  speciality_id: service.dataValues.speciality_id,
                };
              return null;
            })
          );

          var rooms = await Promise.all(
            services.map(async (item) => {
              if (item) {
                const room = await Room.findByPk(item.room_id);
                if (room)
                  return {
                    id: room.dataValues.id,
                    name: room.dataValues.name,
                    location: room.dataValues.location,
                    speciality_id: room.dataValues.speciality_id,
                  };
              }
              return null;
            })
          );

          return {
            id: element.dataValues.id,
            email: element.dataValues.email,
            phone: element.dataValues.phone,
            password: element.dataValues.password,
            name: element.dataValues.name,
            description: element.dataValues.description,
            price: element.dataValues.price,
            role: element.dataValues.role,
            active: element.dataValues.active ?? 1,
            avatar: element.dataValues.avatar,
            create_at: element.dataValues.create_at,
            update_at: element.dataValues.update_at,
            recovery_token: element.dataValues.recovery_token,
            speciality_id: speciality ? speciality.dataValues.id : null,
            speciality_name: speciality ? speciality.dataValues.name : "",
            services: services.filter((item) => item !== null),
            rooms: rooms.filter((item) => item !== null),
          };
        })
      );

      return res.status(200).json({
        result: 1,
        quantity: data ? data.length : 0,
        data: returnData ? returnData : [],
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.message || "Some error occurred while retrieving doctor list.",
      });
    });
};

const getDoctorByID = (info, req, res, next) => {
  const id = req.params.id;

  Doctor.findByPk(id)
    .then(async (element) => {
      const speciality = await Speciality.findByPk(
        element.dataValues.speciality_id
      );

      const return_data = {
        id: id,
        email: element.dataValues.email,
        phone: element.dataValues.phone,
        password: element.dataValues.password,
        name: element.dataValues.name,
        description: element.dataValues.description,
        price: element.dataValues.price,
        role: element.dataValues.role,
        active: element.dataValues.active ?? 1,
        avatar: element.dataValues.avatar,
        create_at: element.dataValues.create_at,
        update_at: element.dataValues.update_at,
        recovery_token: element.dataValues.recovery_token,
        speciality_id: speciality ? speciality.dataValues.id : null,
        speciality_name: speciality ? speciality.dataValues.name : "",
      };

      return res.status(200).json({
        result: 1,
        data: return_data ? return_data : [],
        msg: "Action Seccessful",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.message || "Some error occurred while retrieving doctor.",
      });
    });
};

const createDoctor = (req, res) => {
  const doctor_values = {
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    role: req.body.role,
    active: req.body.active ?? 1, // Default to 1 if not provided
    avatar: req.body.avatar,
    create_at: req.body.create_at ?? new Date(), // Default to current date if not provided
    update_at: req.body.update_at ?? new Date(), // Default to current date if not provided
    recovery_token: req.body.recovery_token,
    speciality_id: req.body.speciality_id,
  };

  Doctor.create(doctor_values)
    .then(async (data) => {
      const speciality = await Speciality.findByPk(
        element.dataValues.speciality_id
      ).data;

      const return_data = {
        id: id,
        email: element.dataValues.email,
        phone: element.dataValues.phone,
        password: element.dataValues.password,
        name: element.dataValues.name,
        description: element.dataValues.description,
        price: element.dataValues.price,
        role: element.dataValues.role,
        active: element.dataValues.active ?? 1,
        avatar: element.dataValues.avatar,
        create_at: element.dataValues.create_at,
        update_at: element.dataValues.update_at,
        recovery_token: element.dataValues.recovery_token,
        speciality_id: speciality ? speciality.data : null,
      };
      if (data == 1)
        return res.status(200).json({
          result: 1,
          data: return_data ? return_data : [],
          msg: "Action Successful",
        });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.message || "Some error occurred creating doctor",
      });
    });
};

const updateDoctor = (req, res) => {
  const id = req.params.id;
  Doctor.update(req.body, { where: { id: id } })
    .then(async (element) => {
      const speciality = await Speciality.findByPk(
        element.dataValues?.speciality_id
      ).data;

      const return_data = {
        id: id,
        email: element.dataValues?.email,
        phone: element.dataValues?.phone,
        password: element.dataValues?.password,
        name: element.dataValues?.name,
        description: element.dataValues?.description,
        price: element.dataValues?.price,
        role: element.dataValues?.role,
        active: element.dataValues?.active ?? 1,
        avatar: element.dataValues?.avatar,
        create_at: element.dataValues?.create_at,
        update_at: element.dataValues?.update_at,
        recovery_token: element.dataValues?.recovery_token,
        speciality_id: speciality ? speciality.data : null,
      };
      req.body.selectionServices.forEach((item) => {
        DoctorService.create({
          doctor_id: id,
          service_id: item,
        })
          .then((data) => {
            // console.log(data);
          })
          .catch((e) => {
            console.log(e);
          });
      });
      return res.status(200).json({
        result: 1,
        data: return_data ? return_data : [],
        msg: "Action Successful",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.message || `Cannot update Doctor with id=${id}`,
      });
    });
};

const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  const appointmentWithDoctor = await Appointment.findOne({
    where: { doctor_id: id },
  });
  const bookingWithDoctor = await Booking.findOne({
    where: { doctor_id: id },
  });
  if (appointmentWithDoctor) {
    return res.status(400).json({
      result: 0,
      msg: "Cannot delete doctor because doctor is assigned in appointment",
    });
  }
  if (bookingWithDoctor) {
    return res.status(400).json({
      result: 0,
      msg: "Cannot delete doctor because doctor is having booking",
    });
  }
  Doctor.update(
    { active: 0 },
    {
      where: { id: id, active: 1 },
    }
  )
    .then(async (data) => {
      if (data == 1) {
        await DoctorService.destroy({
          where: { doctor_id: id },
        });
        return res.status(200).json({
          msg: "Doctor was removed successfully.",
        });
      } else {
        return res.status(500).json({
          msg: `Cannot remove Doctor with id=${id}`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.message,
      });
    });
};

const getAllDoctorsBySpecialityId = async (info, req, res, next) => {
  const specialityId = req.params.id;
  try {
    const data = await Doctor.findAll({
      where: { speciality_id: specialityId, role: "doctor", active: 1 },
    });
    // return res.json(data);
    if (data) {
      var returnData = await Promise.all(
        data.map(async (item) => {
          try {
            const speciality = await Speciality.findByPk(specialityId);
            // const appointment_number = await getDoctorAppointmentNumber(
            //   item.id,
            //   date
            // );

            return {
              id: item.id,
              email: item.email,
              phone: item.phone,
              name: item.name,
              description: item.description,
              price: item.price,
              role: item.role,
              active: item.active,
              avatar: item.avatar,
              create_at: item.create_at,
              update_at: item.update_at,
              speciality: speciality,
              recovery_token: item.recovery_token,
              // appointment_number: appointment_number,
              // available_status:
              //   appointment_number > appointment_number_threshold
              //     ? "Nhiều lịch đặt"
              //     : "",
            };
          } catch (e) {
            console.log(e);
            return null; // Trả về null nếu có lỗi
          }
        })
      );
      returnData = returnData.filter((item) => item !== undefined);
      return res.status(200).json({
        result: 1,
        msg: "Get all doctors by speciality successfully",
        quantity: returnData.length,
        data: returnData ? returnData : [],
      });
    } else {
      return res.status(500).json({
        result: 0,
        msg: "This speciality does not have any doctor",
      });
    }
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: `Error with ${e}`,
    });
  }
};

const getAllDoctorsByServiceId = async (info, req, res, next) => {
  const serviceId = req.params.id;
  const date = req.query.date;
  try {
    const data = await DoctorService.findAll({
      where: { service_id: serviceId },
    });
    // return res.json(data);
    if (data) {
      var returnData = await Promise.all(
        data.map(async (item) => {
          try {
            const result = await Doctor.findOne({
              where: { id: item.doctor_id, active: 1, role: "doctor" },
            });

            if (result) {
              const speciality = await Speciality.findOne({
                where: { id: result.speciality_id },
              });
              const appointment_number = await getDoctorAppointmentNumber(
                result.id,
                date
              );

              return {
                id: result.id,
                email: result.email,
                phone: result.phone,
                name: result.name,
                description: result.description,
                price: result.price,
                role: result.role,
                active: result.active,
                avatar: result.avatar,
                create_at: result.create_at,
                update_at: result.update_at,
                speciality: speciality,
                recovery_token: result.recovery_token,
                appointment_number: appointment_number,
                available_status:
                  appointment_number > appointment_number_threshold
                    ? "Nhiều lịch đặt"
                    : "",
              };
            }
          } catch (e) {
            console.log(e);
            return null; // Trả về null nếu có lỗi
          }
        })
      );
      returnData = returnData.filter((item) => item !== undefined);
      return res.status(200).json({
        result: 1,
        msg: "Get all doctors by service successfully",
        quantity: returnData.length,
        data: returnData ? returnData : [],
      });
    } else {
      return res.status(500).json({
        result: 0,
        msg: "This service not exist",
      });
    }
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: `Error with ${e}`,
    });
  }
};

const getDoctorAppointmentNumber = async (doctor_id, date) => {
  if (date == null) return 0;
  const appointmentNumber = await Appointment.count({
    where: {
      doctor_id: doctor_id,
      date: date,
    },
  });
  return appointmentNumber;
};

module.exports = {
  getDoctorAll,
  getDoctorByID,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctorsBySpecialityId,
  getAllDoctorsByServiceId,
};
