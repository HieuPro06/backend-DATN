const express = require("express");
const BookingPhotosRouter = express.Router();
const {
  getPhotosByBookingId,
  createBookingPhoto
} = require("../controllers/booking-photos.controller.js");
const isLogInController = require("../controllers/is-logIn.controller");
const multer = require("multer");
const path = require("path");
/* Tạo tài nguyên lưu trữ dữ liệu ảnh trên server */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'avatar/Booking');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})
const upload = multer({
  storage: storage
})

BookingPhotosRouter.get("/:id", isLogInController, getPhotosByBookingId);
BookingPhotosRouter.post("/", upload.single('file'), isLogInController, createBookingPhoto);

module.exports = BookingPhotosRouter;
