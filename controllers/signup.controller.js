const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");
const SignupController = async (req, res) => {
  /* Đăng kí bên web - doctor */
  if(req.body.type !== "patient"){
    const request = {
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      name: req.body.name,
      description: req.body.description ?? "",
      price: req.body.price ?? 100000,
      role: "doctor",
      active: 1, // Default to 1 if not provided
      avatar: "",
      create_at: req.body.create_at ?? new Date(), // Default to current date if not provided
      update_at: req.body.update_at ?? new Date(), // Default to current date if not provided
      speciality_id: 1,
      room_id: 1,
    };
    try {
      if (request.password !== request.passwordConfirm) {
        res.status(400).json("Password confirm no match password");
      }
      const result = await Doctor.create(request);
      res.status(200).json({
        result: 1,
        message: "Sign up successfully",
        data: result,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred when sign up",
      });
    }
  }
  /* Đăng kí bên app - patient */
  else {
    const request = {
      email: "",
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      name: "",
      gender: null,
      birthday: "Unknown",
      address: "Unknown",
      avatar: null,
      create_at: req.body.create_at ?? new Date(), // Default to current date if not provided
      update_at: req.body.update_at ?? new Date(),
    };
    /* Tạm thời xử lý ở đây , sau này nên để fe xử lý */
    if (request.password !== request.passwordConfirm) {
      res.status(400).json("Password confirm no match password");
    }
    const existPhone = await Patient.findOne({
      where: {phone: request.phone}
    })
    if(existPhone){
      res.status(400).json({
        result: 0,
        msg: "This phone number had been exist"
      })
    }
    try {
      const result = await Patient.create(request);
      res.status(200).json({
        result: 1,
        message: "Sign up successfully",
        data: result,
      });
    } catch (err){
      res.status(500).send({
        message: err.message || "Some error occurred when sign up",
      });
    }
  }
};

module.exports = SignupController;
