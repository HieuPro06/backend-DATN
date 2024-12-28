const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Speciality = sequelize.define(
  "Speciality",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "tn_specialities",
    timestamps: false,
  }
);
module.exports = Speciality;
