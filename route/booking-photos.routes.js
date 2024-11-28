const express = require("express");
const BookingPhotosRouter = express.Router();
const {
  getPhotosByBookingId,
  createBookingPhoto
} = require("../controllers/booking-photos.controller.js");
const isLogInController = require("../controllers/is-logIn.controller");

BookingPhotosRouter.get("/:id", isLogInController, getPhotosByBookingId);
BookingPhotosRouter.post("/", isLogInController, createBookingPhoto);

module.exports = BookingPhotosRouter;
