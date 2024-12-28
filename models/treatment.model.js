const { DataTypes } = require("sequelize");
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
      allowNull: true,
      references: {
        model: "tn_appointment", // references the tn_doctors table
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    times: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    purpose: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    instruction: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    repeat_days: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    repeat_time: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    drug_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tn_drugs", // The table name you are referencing
        key: "id",
      },
    },
  },
  {
    tableName: "tn_treatments",
    timestamps: false,
  }
);
module.exports = Treatment;
