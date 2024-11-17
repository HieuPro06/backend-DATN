const Service = require("../models/service.model");

const defaultSize = 1000000;

const getAllServices = async (data, req, res, next) => {
  const { length, page } = req.body;
  const limit = length ? length : defaultSize;
  const offset = page ? (page - 1) * limit : 0;
  const result = await Service.findAll({
    limit: limit,
    offset: offset,
  });
  if (!result) {
    res.status(500).json({
      result: 0,
      message: "Error , Don't get services",
    });
  }
  res.status(200).json({
    result: 1,
    message: "Get all services successfully",
    data: result,
  });
};

const getServiceById = async (data, req, res, next) => {
  const id = req.params.id;
  const result = await Service.findOne({
    where: { id: id },
  });
  if (!result) {
    res.status(404).json({
      result: 0,
      message: `Get service with id=${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Get service successfully",
    data: result,
  });
};

const createService = async (req, res) => {
  const request = {
    name: req.body.name,
    description: req.body.description ?? "",
    image: req.body.image ?? "",
  };
  const isExistServiceName = await Service.findOne({
    where: { name: request.name },
  });
  if (isExistServiceName) {
    res.status(400).json({
      result: 0,
      message: "Service name was exist",
    });
  }
  const data = await Service.create(request);
  if (!data) {
    res.status(500).json({
      result: 0,
      message: "Create service failed",
    });
  }
  res.status(200).json({
    result: 1,
    message: "Create service successfully",
    data: data,
  });
};
const updateService = async (req, res) => {
  const id = req.params.id;
  const data = await Service.update(req.body, {
    where: { id: id },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      message: `Update service ${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Update service successfully",
  });
};
const deleteService = async (req, res) => {
  const id = req.params.id;
  const data = await Service.destroy({
    where: { id: id },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      message: `Delete service ${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Delete service successfully",
  });
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
