const BookingPhoto = require("../models/bookingPhoto.model");

const getPhotosByBookingId = async (info, req, res, next) => {
  try {
    const id = req.params.id;

    const data = await BookingPhoto.findAll({
      where: { booking_id: id },
    });
    if (!data) {
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
const createBookingPhoto = async (info, req, res, next) => {
  const request = {
    booking_id: req.body.booking_id,
    url: `${process.env.ENV_DEVELOPMENT}/Booking/${req.file.filename}`,
  };
  try {
    const data = await BookingPhoto.create(request);
    if (data) {
      return res.status(200).json({
        result: 1,
        msg: "Upload booking photo successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e || "Upload booking photo failed , please try again !",
    });
  }
};

module.exports = {
  getPhotosByBookingId,
  createBookingPhoto,
};
