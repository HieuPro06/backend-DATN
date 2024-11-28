const express = require("express");
const BookingPhotoRouter = express.Router();
const {
  getBookingPhoto,
  deleteBookingPhoto,
} = require("../controllers/booking-photo.controller.js");
const isLogInController = require("../controllers/is-logIn.controller");

BookingPhotoRouter.get("/:id", isLogInController ,getBookingPhoto);
BookingPhotoRouter.delete("/:id",isLogInController, deleteBookingPhoto);

module.exports = BookingPhotoRouter;
