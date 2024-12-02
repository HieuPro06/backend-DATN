const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.model");
const DashboardController = async (data, req, res, next) => {
    const token = jwt.decode(data);
    const user = await Doctor.findOne({
        where: {id: token.doctor.id}
    })
    res.status(200).json({
        result: 1,
        msg: "Welcome to Umbrella corporation",
        data: {
            id: user.id,
            email: user.email,
            phone: user.phone,
            name: user.name,
            description: user.description,
            price: user.price,
            role: user.role,
            active: user.active,
            avatar: user.avatar,
            create_at: user.create_at,
            update_at: user.update_at,
            speciality_id: user.speciality_id,
            room_id: user.room_id,
            recovery_token: user.recovery_token
        }
    })
}

module.exports = DashboardController;