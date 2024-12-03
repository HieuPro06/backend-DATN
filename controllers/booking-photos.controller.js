const BookingPhoto = require("../models/bookingPhoto.model");

const getPhotosByBookingId = async (info,req, res,next) => {
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
    data: data
  });
};
const createBookingPhoto = async (info,req,res,next) => {
  const request = {
    booking_id: req.body.booking_id,
    url: req.body.url
  }
  try{
    const data = await BookingPhoto.create(request);
    if(data){
      res.status(200).json({
        result: 1,
        msg: "Upload booking photo successfully"
      })
    }
  } catch (e) {
    return res.status(500).json({
      result: 0,
      msg: e || "Upload booking photo failed , please try again !"
    })
  }
}

module.exports = {
  getPhotosByBookingId,
  createBookingPhoto
};
