const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Appointment = sequelize.define(
  "tn_appointments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tn_bookings", // references the tn_doctors table
        key: "id",
      },
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tn_doctors", // references the tn_doctors table
        key: "id",
      },
    },
    //   patient_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'tn_patients', // references the tn_patients table
    //       key: 'id',
    //     },
    //   },
    patient_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    patient_birthday: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    patient_reason: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    patient_phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    numerical_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    appointment_time: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false, // since you are handling `create_at` and `update_at` manually
    tableName: "tn_appointments",
  }
);

module.exports = Appointment;
