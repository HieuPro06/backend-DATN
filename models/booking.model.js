const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config.js");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tn_services", // The table name you are referencing
        key: "id",
      },
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tn_patients", // The table name you are referencing
        key: "id",
      },
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tn_doctors", // The table name you are referencing
        key: "id",
      },
    },
    booking_name: {
      type: DataTypes.STRING(50),
    },
    booking_phone: {
      type: DataTypes.STRING(15),
    },
    name: {
      type: DataTypes.STRING(50),
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    birthday: {
      type: DataTypes.STRING(10),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    reason: {
      type: DataTypes.STRING(255),
    },
    appointment_date: {
      type: DataTypes.STRING(10),
    },
    appointment_hour: {
      type: DataTypes.STRING(5),
    },
    status: {
      type: DataTypes.STRING(15),
    },
    create_at: {
      type: DataTypes.DATE,
    },
    update_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tn_booking",
    timestamps: false,
  }
);
module.exports = Booking;
