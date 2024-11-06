const Doctor = require("../models/doctor.model.js");

const defaultSize = 10;
const defaultSort = "id";
const defaultDirection = "ASC";

const getDoctorAll = (req, res) => {
  const { size, page } = req.body;

  const limit = size ? size : defaultSize;
  const offset = page ? (page - 1) * limit : 0;

  Doctor.findAll({
    // where: condition,
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
          err.message || "Some error occurred while retrieving doctor list.",
      });
    });
  // res.json("GET DOCTORS");
};

const getDoctorByID = (req, res) => {
  const id = req.params.id;

  Doctor.findByPk(id)
    .then((data) => {
      res.send({
        data: data ? data : [],
        count: data ? data.length : 0,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving doctor.",
      });
    });
  // res.json("GET DOCTORS");
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred creating doctor",
      });
    });
  // res.json("GET DOCTORS");
};

const updateDoctor = (req, res) => {
  const id = req.params.id;

  Doctor.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data == 1)
        res.send({
          message: "Doctor was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot update Category with id=${id}`,
      });
    });
  // res.json("GET DOCTORS");
};

module.exports = { getDoctorAll, getDoctorByID, createDoctor, updateDoctor };
