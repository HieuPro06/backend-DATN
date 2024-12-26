const { DataTypes } = require("sequelize");
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
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tn_rooms", // The table name you are referencing
        key: "id",
      },
    },
    speciality_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tn_specialities", // The table name you are referencing
        key: "id",
      },
    },
  },
  {
    tableName: "tn_services",
    timestamps: false,
  }
);
module.exports = Service;
