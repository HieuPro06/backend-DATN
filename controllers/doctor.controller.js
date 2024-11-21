const Doctor = require("../models/doctor.model.js");
const Room = require("../models/room.model.js");
const Speciality = require("../models/speciality.model.js");

const defaultSize = 10;
const defaultSort = "id";
const defaultDirection = "ASC";
const condition_active = { active: 1 };

const getDoctorAll = (info,req,res,next) => {
  const { size, page } = req.body;

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
          ).data;
          const room = await Room.findByPk(element.dataValues.room_id).data;

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
            speciality_id: speciality ? speciality.data : null,
            room_id: room ? room.data : null,
          };
        })
      );

      res.send({
        result: 1,
        quantity: data ? data.length : 0,
        data: returnData ? returnData : [],
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving doctor list.",
      });
    });
};

const getDoctorByID = (info,req,res,next) => {
  const id = req.params.id;

  Doctor.findByPk(id)
    .then(async (element) => {
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

      res.send({
        result: 1,
        data: return_data ? return_data : [],
        msg: "Action Seccessful",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving doctor.",
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

      res.send({
        result: 1,
        data: return_data ? return_data : [],
        msg: "Action Seccessful",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred creating doctor",
      });
    });
};

const updateDoctor = (req, res) => {
  const id = req.params.id;

  Doctor.update(req.body)
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

      res.send({
        result: 1,
        data: return_data ? return_data : [],
        msg: "Action Seccessful",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot update Doctor with id=${id}`,
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
        res.send({
          message: "Doctor was removed successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot remove Doctor with id=${id}`,
      });
    });
};

module.exports = {
  getDoctorAll,
  getDoctorByID,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
