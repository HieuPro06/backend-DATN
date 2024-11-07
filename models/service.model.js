const { DataTypes} = require("sequelize");
const { sequelize } = require("../config/db.config");

const Service = sequelize.define(
    "Service",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
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
        tableName: "tn_services",
        timestamps: false
    }
)
module.exports = Service;