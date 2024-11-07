const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config.js"); // Adjust this path to your Sequelize configuration

const Patient = sequelize.define(
    "Patient",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        create_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        update_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        tableName: "tn_patients", // Table name if different from the model name
        timestamps: false, // Disables Sequelize's automatic `createdAt` and `updatedAt` columns
    }
);

module.exports = Patient;
