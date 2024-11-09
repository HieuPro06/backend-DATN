const Booking = require("../models/booking.model");
const Service = require("../models/service.model");
const booking_status = require("../enum");
const moment = require("moment");

const createBooking = async (req,res) => {
    const request = {
        service_id: req.body.serviceId,
        patient_id: req.body.patientId,
        booking_name: req.body.bookingName,
        booking_phone: req.body.bookingPhone,
        name: req.body.name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        address: req.body.address,
        reason: req.body.reason,
        appointment_date: req.body.appointmentTime.split(" ")[0],
        appointment_hour: req.body.appointmentTime.split(" ")[1],
        status: booking_status.PROCESSING,
    }
    const data = await Booking.create(request);
    if(!data){
        res.status(500).json({
            result: 0,
            msg:"Error ! Can't be booking , please try again"
        })
    }
    const service  = await Service.findOne({
        where: {id: data?.service_id}
    })
    res.status(200).json({
        result: 1,
        msg: `Congratulations . ${request.booking_name} ! This booking at ${request.appointment_date} ${request.appointment_hour} which has been created succesfully by you`,
        data: {
            id: data.id,
            booking_name: data.booking_name,
            booking_phone: data.booking_phone,
            name: data.name,
            gender: data.gender,
            birthday: data.birthday,
            address: data.address,
            reason: data.reason,
            appointment_time: `${data.appointment_date} ${data.appointment_hour}`,
            status: data.status,
            create_at: moment().format('YYYY-MM-DD HH:MM:SS'),
            update_at: moment().format('YYYY-MM-DD HH:MM:SS'),
            service: {
                id: data.service_id,
                name: service.name
            }
        }
    })
}
const deleteBooking = async (req,res) => {
    const id = req.params.id;
    const requestBooking = await Booking.findOne({
        where: {id: id}
    })
    if(!requestBooking){
        res.status(404).json({
            result: 0,
            msg: "This booking not exist"
        })
    }
    if(requestBooking.status === booking_status.CANCEL){
        res.status(400).json({
            result: 0,
            msg: "This booking's status is cancelled . No need any more action !"
        })
    } else if(requestBooking.status === booking_status.PROCESSING){
        await Booking.update({status: booking_status.CANCEL},{
            where: {id: id}
        })
        res.status(200).json({
            result: 1,
            msg: "Booking has been cancelled successfully !"
        })
    }
}
module.exports = {
    createBooking,
    deleteBooking
};