const express = require("express");
const DoctorProfileRoute = express.Router();
const doctorProfileController = require("../controllers/doctor-profile.controller");
const isLogInController = require("../controllers/is-logIn.controller");
const changeDoctorProfileController = require("../controllers/change-doctor-profile.controller");
const {changeAvatarDoctorController} = require("../controllers/change-avatar-doctor.controller");
const multer = require("multer");
const path = require("path");
/* Tạo tài nguyên lưu trữ dữ liệu ảnh trên server */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'avatar/Doctor');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})
DoctorProfileRoute.get("/",isLogInController, doctorProfileController);
DoctorProfileRoute.put("/",isLogInController, changeDoctorProfileController);
DoctorProfileRoute.put("/avatar",upload.single('file'),isLogInController,changeAvatarDoctorController);

module.exports = DoctorProfileRoute;