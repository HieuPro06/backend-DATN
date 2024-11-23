const express = require("express");
const BookingPhotoRouter = express.Router();
const {
  getBookingPhoto,
  deleteBookingPhoto,
} = require("../controllers/booking-photo.controller.js");

BookingPhotoRouter.get("/:id", getBookingPhoto);
BookingPhotoRouter.delete("/:id", deleteBookingPhoto);

module.exports = BookingPhotoRouter;
