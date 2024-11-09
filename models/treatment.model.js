const { DataTypes} = require("sequelize");
const { sequelize } = require("../config/db.config");

const Treatment = sequelize.define(
    "Treatment",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        appointment_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        times: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        purpose: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        instruction: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        repeat_days: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        repeat_time: {
            type: DataTypes.STRING(5),
            allowNull: false,
        }
    },{
        tableName: "tn_treatments",
        timestamps: false
    }
)
module.exports = Treatment;