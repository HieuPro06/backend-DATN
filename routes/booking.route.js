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

BookingRouter.post("/", createBooking);
BookingRouter.delete("/:id", deleteBooking);
BookingRouter.get("/", readAllBooking);
BookingRouter.get("/:id", readBookingById);
BookingRouter.put("/:id", updateBooking);
BookingRouter.put("/confirm/:id", confirmBooking);
module.exports = BookingRouter;
