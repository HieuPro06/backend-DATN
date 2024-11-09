const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config.js"); // Adjust this path to your Sequelize configuration

const AppointmentRecord = sequelize.define(
    "AppointmentRecord",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        appointment_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        status_before: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status_after: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        create_at: {
            type: DataTypes.DATE,
        },
        update_at: {
            type: DataTypes.DATE,
        }
    },{
        tableName: 'tn_appointment_records',
        timestamps: false
    }
)

module.exports = AppointmentRecord;