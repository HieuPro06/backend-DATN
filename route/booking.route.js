const express = require("express");
const BookingRouter = express.Router();
const {createBooking , deleteBooking, readAllBooking, readBookingById} = require("../controllers/booking.controller");

BookingRouter.post("/",createBooking);
BookingRouter.delete("/:id",deleteBooking);
BookingRouter.get("/",readAllBooking);
BookingRouter.get("/:id",readBookingById);

module.exports = BookingRouter;