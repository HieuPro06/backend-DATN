const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const BookingPhoto = sequelize.define(
  "tn_booking_photo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "tn_booking_photo",
    timestamps: false, // If you don't want createdAt/updatedAt columns
  }
);

module.exports = BookingPhoto;
