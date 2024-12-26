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
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "tn_rooms",
    timestamps: false,
  }
);
module.exports = Room;
