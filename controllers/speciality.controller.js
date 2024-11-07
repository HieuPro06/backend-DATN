const Speciality = require("../models/speciality.model");

const defaultSize = 10;

const getAllSpeciality = async (data,req,res,next) => {
    const {size, page} = req.body;
    const limit = size ? size : defaultSize;
    const offset = page ? (page - 1) * limit : 0;
    const result = await Speciality.findAll({
        limit: limit,
        offset: offset
    })
    if(!result){
        res.status(500).json({
            result: 0,
            message: "Error , Don't get specialities"
        })
    }
    res.status(200).json({
        result: 1,
        message: "Get all specialities successfully",
        data: result
    })
}

const createSpeciality = async (req,res) => {
    const request = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image ?? ""
    }
    const data = await Speciality.create(request);
    if(!data){
        res.status(500).json({
            result: 0,
            message: "Create speciality failed"
        })
    }
    res.status(200).json({
        result: 1,
        message: "Create speciality successfully",
        data: data
    })
}

module.exports = {
    getAllSpeciality,
    createSpeciality
};
