const Doctor = require("../models/doctor.model.js");
const Room = require("../models/room.model.js");
const Speciality = require("../models/speciality.model.js");
const DoctorService = require("../models/doctorAndService.model");
const dotenv = require("dotenv");
dotenv.config();

const defaultSize = 100;
const defaultSort = "id";
const defaultDirection = "ASC";
const condition_active = { active: 1 };

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
          const room = await Room.findByPk(element.dataValues.room_id);

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
            room_id: room ? room.dataValues.id : null,
            room_name: room ? room.dataValues.name : "",
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
      const room = await Room.findByPk(element.dataValues.room_id);

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
        room_id: room ? room.dataValues.id : null,
        room_name: room ? room.dataValues.name : "",
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
    room_id: req.body.room_id,
  };

  Doctor.create(doctor_values)
    .then(async (data) => {
      const speciality = await Speciality.findByPk(
        element.dataValues.speciality_id
      ).data;
      const room = await Room.findByPk(element.dataValues.room_id).data;

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
        room_id: room ? room.data : null,
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
      const room = await Room.findByPk(element.dataValues?.room_id).data;

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
        room_id: room ? room.data : null,
      };

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

const deleteDoctor = (req, res) => {
  const id = req.params.id;

  Doctor.update(
    { active: 0 },
    {
      where: { id: id, active: 1 },
    }
  )
    .then((data) => {
      if (data == 1)
        return res.status(200).json({
          msg: "Doctor was removed successfully.",
        });
      else
        return res.status(500).json({
          msg: `Cannot remove Doctor with id=${id}`,
        });
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
      where: { speciality_id: specialityId },
    });
    if (data) {
      const speciality = await Speciality.findOne({
        where: { id: specialityId },
      });
      return res.status(200).json({
        result: 1,
        msg: "Get all doctor by speciality successfully",
        quantity: data.length,
        data: data.map((item) => {
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
            room_id: item.room_id,
            recovery_token: item.recovery_token,
          };
        }),
      });
    }
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: "Get all doctor failed",
    });
  }
};

const getAllDoctorsByServiceId = async (info, req, res, next) => {
  const serviceId = req.params.id;
  try {
    const data = await DoctorService.findAll({
      where: { service_id: serviceId },
    });
    // return res.json(data);
    if (data) {
      const returnData = await Promise.all(
        data.map(async (item) => {
          try {
            const result = await Doctor.findOne({
              where: { id: item.doctor_id },
            });
            const speciality = await Speciality.findOne({
              where: { id: result.speciality_id },
            });
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
              room_id: result.room_id,
              recovery_token: result.recovery_token,
            };
          } catch (e) {
            console.log(e);
            return null; // Trả về null nếu có lỗi
          }
        })
      );
      return res.status(200).json({
        result: 1,
        msg: "Get all doctors by service successfully",
        quantity: returnData.length,
        data: returnData,
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

module.exports = {
  getDoctorAll,
  getDoctorByID,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctorsBySpecialityId,
  getAllDoctorsByServiceId,
};
