const express = require("express");
const BookingRouter = express.Router();
const {createBooking , deleteBooking} = require("../controllers/booking.controller");

BookingRouter.post("/",createBooking);
BookingRouter.delete("/:id",deleteBooking);
module.exports = BookingRouter;