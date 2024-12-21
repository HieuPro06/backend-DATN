const Service = require("../models/service.model");
const DoctorAndService = require("../models/doctorAndService.model");
const Booking = require("../models/booking.model");
const dotenv = require("dotenv");
dotenv.config();

const defaultSize = 1000000;

const getAllServices = async (data, req, res, next) => {
  try {
    const { length, page } = req.body;
    const limit = length ? length : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    const result = await Service.findAll({
      limit: limit,
      offset: offset,
    });
    if (!result) {
      return res.status(500).json({
        result: 0,
        msg: "Error , Don't get services",
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Get all services successfully",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const getServiceById = async (data, req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Service.findOne({
      where: { id: id },
    });
    if (!result) {
      return res.status(404).json({
        result: 0,
        msg: `Get service with id=${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Get service successfully",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const createService = async (req, res) => {
  try {
    const request = {
      name: req.body.name,
      description: req.body.description ?? "",
      image: req.body.image ?? "",
    };
    const isExistServiceName = await Service.findOne({
      where: { name: request.name },
    });
    if (isExistServiceName) {
      return res.status(400).json({
        result: 0,
        msg: "Service name was exist",
      });
    }
    const data = await Service.create(request);
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: "Create service failed",
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Create service successfully",
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Service.update(req.body, {
      where: { id: id },
    });
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: `Update service ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Update service successfully",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const serviceUsed = await Booking.findOne({
      where: {service_id: id}
    })
    const doctorInService = await DoctorAndService.findOne({
      where: {service_id: id}
    })
    if(serviceUsed || doctorInService){
      return res.status(400).json({
        result: 0,
        msg: "This service is used or have doctor in there , Don't remove"
      })
    }
    const data = await Service.destroy({
      where: { id: id },
    });
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: `Delete service ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Delete service successfully",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
