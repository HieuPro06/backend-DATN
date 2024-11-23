const express = require("express");
const BookingPhotosRouter = express.Router();
const {
  getPhotosByBookingId,
} = require("../controllers/booking-photos.controller.js");

BookingPhotosRouter.get("/:id", getPhotosByBookingId);

module.exports = BookingPhotosRouter;
