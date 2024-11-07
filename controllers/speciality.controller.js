const Speciality = require("../models/speciality.model");

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

module.exports = createSpeciality;
