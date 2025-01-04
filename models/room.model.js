const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    tableName: "tn_rooms",
    timestamps: false,
  }
);
module.exports = Room;
