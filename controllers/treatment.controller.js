const Treatment = require("../models/treatment.model");

const createNewTreatment = async (req,res) => {
    const request = {
        appointment_id: req.body.appointment_id,
        name: req.body.name,
        type: req.body.type,
        times: req.body.times,
        purpose: req.body.purpose,
        instruction: req.body.instruction,
        repeat_days: req.body.repeat_days,
        repeat_time: req.body.repeat_time
    }
    const data = await Treatment.create(request);
    if(!data){
        res.status(500).json({
            result: 0,
            msg: "Can't create new treatment record"
        })
    }
    res.status(200).json({
        result: 1,
        msg: "Create treatment record successfully",
        data: data
    })
}

const getTreatment = async (req,res) => {
    const appointmentId = req.params.id;
    const data = await Treatment.findOne({
        where: {appointment_id: appointmentId}
    })
    if(!data){
        res.status(500).json({
            result: 0,
            msg: "Can't get treatment record"
        })
    }
    res.status(200).json({
        result: 1,
        msg: "Get treatment record successfully",
        data: data
    })
}

module.exports = {
    createNewTreatment,
    getTreatment
};