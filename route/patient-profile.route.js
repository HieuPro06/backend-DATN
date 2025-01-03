const express = require("express");
const isLogInController = require("../controllers/is-logIn.controller");
const PatientProfileController = require("../controllers/patient-profile.controller");
const ChangePatientProfileController = require("../controllers/change-patient-profile.controller");
const {
  changeAvatarPatientController,
  changeAvatarAndroidPatientController,
} = require("../controllers/change-avatar-patient.controller");
const PatientProfileRouter = express.Router();
const multer = require("multer");
const path = require("path");
/* Tạo tài nguyên lưu trữ dữ liệu ảnh trên server */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatar/Patient");
  },
  filename: (req, file, cb) => {
    cb(null, "file_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});
PatientProfileRouter.get("/", isLogInController, PatientProfileController);
PatientProfileRouter.put(
  "/",
  isLogInController,
  ChangePatientProfileController
);
// PatientProfileRouter.put("/avatar",upload.single('file'),isLogInController,changeAvatarPatientController);
PatientProfileRouter.put(
  "/avatar/:id",
  upload.single("file"),
  isLogInController,
  changeAvatarPatientController
);

module.exports = PatientProfileRouter;
