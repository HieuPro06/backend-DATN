const express = require("express");
const BookingRouter = express.Router();
const createBooking = require("../controllers/booking.controller");

BookingRouter.post("/",createBooking);

module.exports = BookingRouter;