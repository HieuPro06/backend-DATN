const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config.js");
const Doctor = require("./doctor.model"); // Adjust the path to the Doctor model
const Service = require("./service.model"); // Adjust the path to the Service model

const DoctorAndService = sequelize.define(
  "DoctorAndService",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Service, // Reference to the Service model
        key: "id",
      },
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Doctor, // Reference to the Doctor model
        key: "id",
      },
    },
  },
  {
    tableName: "tn_doctor_and_service",
    timestamps: false, // Assuming there are no createdAt/updatedAt columns in this table
  }
);

// Define associations
DoctorAndService.belongsTo(Doctor, {
  foreignKey: "doctor_id",
  targetKey: "id",
});
DoctorAndService.belongsTo(Service, {
  foreignKey: "service_id",
  targetKey: "id",
});

module.exports = DoctorAndService;
