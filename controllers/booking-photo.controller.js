const BookingPhoto = require("../models/bookingPhoto.model");

const getBookingPhoto = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await BookingPhoto.findOne({
      where: { id: id },
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
