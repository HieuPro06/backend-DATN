const express = require("express");
const BookingRouter = express.Router();
const {
  createBooking,
  deleteBooking,
  readAllBooking,
  readBookingById,
  confirmBooking,
  updateBooking,
} = require("../controllers/booking.controller");
const isLogInController = require("../controllers/is-logIn.controller");

BookingRouter.post("/",isLogInController,createBooking);
BookingRouter.delete("/:id",isLogInController,deleteBooking);
BookingRouter.get("/",isLogInController,readAllBooking);
BookingRouter.get("/:id",isLogInController,readBookingById);
BookingRouter.put("/:id",isLogInController,updateBooking);
BookingRouter.put("/confirm/:id",isLogInController,confirmBooking);
module.exports = BookingRouter;
