const Doctor = require("../models/doctor.model.js");
const DoctorAndService = require("../models/doctorAndService.model.js");
const Room = require("../models/room.model.js");
const Service = require("../models/service.model.js");
const Speciality = require("../models/speciality.model.js");
const { getServiceById } = require("./services.controller.js");

const defaultSize = 10;
const defaultSort = "id";
const defaultDirection = "ASC";
const condition_active = { active: 1 };

const getDoctorsFromServiceId = async (req, res) => {
  const { size, page } = req.body;
  const id = req.params.id;

  const limit = size ? size : defaultSize;
  const offset = page ? (page - 1) * limit : 0;

  const service = await Service.findByPk(id);

  const doctorAndService = await DoctorAndService.findAll({ service_id: id });

  const doctor_ids = doctorAndService.map((item) => item.doctor_id);

  const condition = { ...condition_active, id: { [Op.in]: doctor_ids } };

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
        msg: "Action successfully",
        quantity: data ? data.length : 0,
        data: returnData ? returnData : [],
        service: {
          id: service.id,
          name: service.name,
          description: service.description,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.message || "Some error occurred while retrieving doctor list.",
      });
    });
};

const getServicesFromDoctorId = async (req, res) => {
  const { size, page } = req.body;
  const id = req.params.id;

  const limit = size ? size : defaultSize;
  const offset = page ? (page - 1) * limit : 0;

  const doctor = await Doctor.findOne({ where: { id: id, active: true } });

  if (!doctor) {
    res.status(500).json({
      result: 0,
      msg: "Doctor is not available",
    });
  }

  const doctorAndService = await DoctorAndService.findAll({
    where: { doctor_id: doctor.id },
  });

  const service_ids = doctorAndService.map((item) => item.service_id);

  const condition = { ...condition_active, id: { [Op.in]: service_ids } };

  Service.findAll({
    where: condition,
    limit: limit,
    offset: offset,
    // order: sorting.sortQuery(req, defaultSort, defaultDirection),
  })
    .then(async (data) => {
      res.send({
        result: 1,
        msg: "Action successfully",
        quantity: data ? data.length : 0,
        data: returnData ? returnData : [],
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg:
          err.message || "Some error occurred while retrieving service list.",
      });
    });
};

const deleteDoctorService = (req, res) => {
  const id = req.params.id;

  DoctorAndService.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (data == 1)
        res.send({
          msg: "Doctor Service pair was removed successfully.",
        });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: `Cannot remove Doctor Service pair with id=${id}`,
      });
    });
};

const createDoctorAndService = async (req, res) => {
  const request = req.body;

  const doctor = await Doctor.findOne({
    where: { id: request.dataValues.doctor_id, active: true },
  });

  if (!doctor) {
    res.status(500).json({
      result: 0,
      msg: "Doctor is not available",
    });
  }

  const service = await Service.findOne({
    where: { id: request.dataValues.service_id },
  });

  if (!service) {
    res.status(500).json({
      result: 0,
      msg: "Service is not available",
    });
  }

  const data = await DoctorAndService.create(request);
  if (!data) {
    res.status(500).json({
      result: 0,
      msg: "Error!",
    });
  } else {
    res.status(500).json({
      result: 1,
      msg: "Created successfully",
    });
  }
};

const checkDoctorServiceCompatible = async (service_id, doctor_id) => {
  const data = await DoctorAndService.findAll({
    where: {
      doctor_id: doctor_id,
      service_id: service_id,
    },
  });

  if (data.length > 0) return true;
  else return false;
};

module.exports = {
  getDoctorsFromServiceId,
  deleteDoctorService,
  getServicesFromDoctorId,
  createDoctorAndService,
  checkDoctorServiceCompatible,
};
