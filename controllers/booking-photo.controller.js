const BookingPhoto = require("../models/bookingPhoto.model");

const getBookingPhoto = async (req, res) => {
  const id = req.params.id;

  const data = await BookingPhoto.findOne({
    where: { id: id },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      message: `Get photo ${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Get photo successfully",
  });
};

const deleteBookingPhoto = async (req, res) => {
  const id = req.params.id;

  const data = await BookingPhoto.destroy({
    where: { id: id },
  });
  if (!data) {
    res.status(500).json({
      result: 0,
      message: `Delete photo ${id} failed`,
    });
  }
  res.status(200).json({
    result: 1,
    message: "Delete photo successfully",
  });
};

module.exports = { getBookingPhoto, deleteBookingPhoto };
