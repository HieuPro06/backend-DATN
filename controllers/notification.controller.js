const { where } = require("sequelize");
const jwt = require("jsonwebtoken");
const Notification = require("../models/notification.model");

const defaultSize = 1000000;

const getAllNotifications = async (data, req, res, next) => {
  try {
    const auth = jwt.decode(data);
    const patient_id = auth.patient.id ? auth.patient.id : null;

    if (patient_id == null) {
      res.status(500).json({
        result: 0,
        message: "Error",
      });
    }

    const { length, page } = req.body;
    const limit = length ? length : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    const result = await Notification.findAll({
      limit: limit,
      offset: offset,
      where: {
        patient_id: patient_id,
      },
    });
    if (!result) {
      res.status(500).json({
        result: 0,
        message: "Error",
      });
    }
    res.status(200).json({
      result: 1,
      message: "Get all notifications successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      result: 0,
      message: err,
    });
  }
};

const getNotificationById = async (data, req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Notification.findOne({
      where: { id: id },
    });
    if (!result) {
      res.status(404).json({
        result: 0,
        message: `Get notification with id=${id} failed`,
      });
    }
    res.status(200).json({
      result: 1,
      message: "Get notification successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      result: 0,
      message: err,
    });
  }
};

const createNotification = async (data, req, res, next) => {
  try {
    const auth = jwt.decode(data);
    const patient_id = auth.patient.id ? auth.patient.id : null;

    if (patient_id == null) {
      res.status(500).json({
        result: 0,
        message: "Error",
      });
    }

    const request = {
      name: req.body.name,
      location: req.body.location,
    };

    const data = await Notification.create(request);
    if (!data) {
      res.status(500).json({
        result: 0,
        message: "Create notification failed",
      });
    }
    res.status(200).json({
      result: 1,
      message: "Create notification successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      result: 0,
      message: err,
    });
  }
};

const markAsRead = async (data, req, res, next) => {
  try {
    const id = req.params.id;
    const auth = jwt.decode(data);
    const patient_id = auth.patient.id ? auth.patient.id : null;

    if (patient_id == null) {
      res.status(500).json({
        result: 0,
        message: "Error",
      });
    }

    const data = await Notification.update(
      { is_read: 1 },
      { where: { id: id } }
    );
    if (!data) {
      res.status(500).json({
        result: 0,
        message: "Mark as read failed",
      });
    }
    res.status(200).json({
      result: 1,
      message: "Mark as read successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      result: 0,
      message: err,
    });
  }
};

const markAsReadAll = async (data, req, res, next) => {
  try {
    const auth = jwt.decode(data);
    const patient_id = auth.patient.id ? auth.patient.id : null;

    if (patient_id == null) {
      res.status(500).json({
        result: 0,
        message: "Error",
      });
    }

    const data = await Notification.update(
      { is_read: 1 },
      { where: { patient_id: patient_id, is_read: 0 } }
    );
    if (!data) {
      res.status(500).json({
        result: 0,
        message: "Mark as read failed",
      });
    }
    res.status(200).json({
      result: 1,
      message: "Mark as read successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      result: 0,
      message: err,
    });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  markAsRead,
  markAsReadAll,
};
