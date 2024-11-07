const { DataTypes} = require("sequelize");
const { sequelize } = require("../config/db.config");

const Speciality = sequelize.define(
    "Speciality",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },{
        tableName: "tn_specialities",
        timestamps: false
    }
)
module.exports = Speciality;