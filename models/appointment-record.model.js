const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config.js"); // Adjust this path to your Sequelize configuration

const AppointmentRecord = sequelize.define(
  "AppointmentRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    status_before: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status_after: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,
    },
    update_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tn_appointment_records",
    timestamps: false,
  }
);

module.exports = AppointmentRecord;
