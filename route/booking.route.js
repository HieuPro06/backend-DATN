const express = require("express");
const BookingRouter = express.Router();
const {createBooking , deleteBooking, readAllBooking} = require("../controllers/booking.controller");

BookingRouter.post("/",createBooking);
BookingRouter.delete("/:id",deleteBooking);
BookingRouter.get("/",readAllBooking);
module.exports = BookingRouter;