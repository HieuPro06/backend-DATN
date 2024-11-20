const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");
const dotenv = require("dotenv");
// const base64Url = require("../utils/index");
// const crypto = require("crypto");
const jwt = require("jsonwebtoken");
dotenv.config();

const loginController = async (req,res) => {
    /* Đăng nhập bên web - doctor */
    if(req.body.type !== "patient"){
        const request = {
            type: req.body.type ?? "null",
            email: req.body.email,
            password: req.body.password
        }
        const result = await Doctor.findOne({
            where: {email: request.email}
        })
        if(result){
            if(result.password !== request.password){
                res.status(400).json({
                    message: "Wrong password"
                })
            } else{
                // Generate token
                // const header = {
                //     "alg": "HS256",
                //     "typ": "JWT"
                // }
                const payload = {
                    doctor: {
                        id: result.id,
                        role: result.role
                    },
                    expire: Date.now() + 3600
                }
                // const encodeHeader = base64Url(JSON.stringify(header));
                // const encodePayload = base64Url(JSON.stringify(payload));
                // const tokenData = `${encodeHeader}.${encodePayload}`;
                // const hmac = crypto.createHmac("sha256",process.env.JWT_SECRET);
                // const signature = hmac.update(tokenData).digest("base64url");
                // const token = `${tokenData}.${signature}`;
                const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '3h'});
                res.status(200).json({
                    accessToken: token
                })
            }
        } else {
            res.status(404).json({
                message: "Account invalid"
            })
        }
    }
    /* Đăng nhập bên app - patient */
    else {
        const request = {
            type: req.body.type ?? "patient",
            phone: req.body.phone,
            password: req.body.password,
        }
        /* Tìm xem số điện thoại này đã được đăng ký chưa */
        const result = await Patient.findOne({
            where: {phone: request.phone}
        })
        /* Nếu mà SĐT đã được đăng ký */
        if(result){
            /* Check mật khẩu */
            if(result.password === request.password){
                const payload = {
                    patient: {
                        id: result.id,
                        phone: result.phone
                    },
                    expire: Date.now() + 3600
                }
                const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '3h'});
                res.status(200).json({
                    result: 1,
                    msg: "Login successfully",
                    data: {
                        accessToken: token
                    }
                })
            } else {
                res.status(400).json({
                    result: 0,
                    msg: "Wrong password"
                })
            }
        } else {
            res.status(404).json({
                result: 0,
                msg: "Account invalid",
            })
        }
    }
}
module.exports = loginController;