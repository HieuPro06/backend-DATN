const Doctor = require("../models/doctor.model");
const SignupController = async (req,res) => {
    const request = {
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        name: req.body.name,
        description: req.body.description ?? "",
        price: req.body.price ?? 100000,
        role: "member",
        active: 1, // Default to 1 if not provided
        avatar: "",
        create_at: req.body.create_at ?? new Date(), // Default to current date if not provided
        update_at: req.body.update_at ?? new Date(), // Default to current date if not provided
        speciality_id: 1,
        room_id: 1,
    };
    try{
        if(request.password !== request.passwordConfirm){
            res.status(400).json(
                "Password confirm no match password"
            )
        }
        const result = await Doctor.create(request);
        res.json(result);
    } catch (e){
        res.status(500).send({
            message: err.message || "Some error occurred creating doctor",
        });
    }
}

module.exports = SignupController;