const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");
const bcrypt = require("bcrypt");
const {hashPassword} = require("mysql/lib/protocol/Auth");

const SignupController = async (req, res) => {
  const salt = 10;
  /* Đăng kí bên web - doctor */
  if(req.body.type !== "patient"){
    const request = {
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      name: req.body.name ?? "", // Default name is empty string
      description: req.body.description ?? "", // Default description is empty string
      price: req.body.price ?? 100000, // Default price is 100000
      role: "doctor", // Default role is DOCTOR
      active: 1, // Default to 1 if not provided
      avatar: "", // Default avatar is empty string
      create_at: req.body.create_at ?? new Date(), // Default to current date if not provided
      update_at: req.body.update_at ?? new Date(), // Default to current date if not provided
      speciality_id: 1, // Default speciality 1
      room_id: 1, // Default room 1
    };
    /* Kiểm tra xem email và số điện thoại đã được dùng chưa */
    const existEmail = await Doctor.findOne({
      where: {email: request.email}
    });
    const existPhone = await Doctor.findOne({
      where: {phone: request.phone}
    })
    if(existEmail){
      return res.status(400).json({
        result: 0,
        msg: "Email had been exist"
      })
    }
    if(existPhone){
      return res.status(400).json({
        result: 0,
        msg: "Phone number had been exist"
      })
    }
    /* Mã hoá password */
    bcrypt.hash(request.password , salt , async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }
      request.password = hashedPassword;
      /* Xử lý đăng ký */
      try {
        const result = await Doctor.create(request);
        res.status(200).json({
          result: 1,
          msg: "Sign up successfully",
          data: result,
        });
      } catch (err) {
        res.status(500).json({
          result: 0,
          msg: err.message || "Some error occurred when sign up"
        });
      }
    })
  }
  /* Đăng kí bên app - patient */
  else {
    const request = {
      email: "user@gmail.com", // Default email is user@gmail.com
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      name: "User", // Default name is User
      gender: null, // Default gendet is null
      birthday: "Unknown", // Default birthday is Unknown
      address: "Unknown",// Default address is Unknown
      avatar: null,// Default avatar is null
      create_at: req.body.create_at ?? new Date(), // Default to current date if not provided
      update_at: req.body.update_at ?? new Date(), // Default to current date if not provided
    };
    const existPhone = await Patient.findOne({
      where: {phone: request.phone}
    })
    if(existPhone){
      return res.status(400).json({
        result: 0,
        msg: "This phone number had been exist"
      })
    }
    /* Mã hoá password */
    bcrypt.hash(request.password, salt , async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }
      request.password = hashedPassword;
      try {
        const result = await Patient.create(request);
        res.status(200).json({
          result: 1,
          msg: "Sign up successfully",
          data: result,
        });
      } catch (err){
        res.status(500).json({
          result: 0,
          msg: err.message || "Some error occurred when sign up"
        });
      }
    })
  }
};

module.exports = SignupController;
