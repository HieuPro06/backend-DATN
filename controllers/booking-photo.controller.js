const BookingPhoto = require("../models/bookingPhoto.model");
const dotenv = require("dotenv");
dotenv.config();

const getBookingPhoto = async (data, req, res, next) => {
  try {
    const id = req.params.id;

    const response = await BookingPhoto.findOne({
      where: { id: id },
    });
    if (!response) {
      return res.status(500).json({
        result: 0,
        msg: `Get photo ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Get photo successfully",
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

const deleteBookingPhoto = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await BookingPhoto.destroy({
      where: { id: id },
    });
    if (!data) {
      return res.status(500).json({
        result: 0,
        msg: `Delete photo ${id} failed`,
      });
    }
    return res.status(200).json({
      result: 1,
      msg: "Delete photo successfully",
    });
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e.message,
    });
  }
};

module.exports = { getBookingPhoto, deleteBookingPhoto };
