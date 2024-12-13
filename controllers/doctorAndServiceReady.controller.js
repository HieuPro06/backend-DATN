const Doctor = require("../models/doctor.model.js");
const DoctorAndService = require("../models/doctorAndService.model.js");
const Room = require("../models/room.model.js");
const Service = require("../models/service.model.js");
const Speciality = require("../models/speciality.model.js");
const { Op } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const doctorAndServiceReady = async (req, res) => {
  const id = req.params.id;

  const doctorAndService = await DoctorAndService.findAll({ service_id: id });

  const doctor_ids = doctorAndService.map((item) => item.doctor_id);

  const condition = { ...condition_active, id: { [Op.notIn]: doctor_ids } };

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

      return res.status(200).json({
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

module.exports = {
  doctorAndServiceReady,
};
