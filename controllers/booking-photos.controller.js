const BookingPhoto = require("../models/bookingPhoto.model");

const getPhotosByBookingId = async (req, res) => {
  const id = req.params.id;

  const data = await BookingPhoto.findAll({
    where: { booking_id: id },
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

module.exports = { getPhotosByBookingId };
