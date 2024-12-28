const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config.js"); // adjust the path as needed

const Drug = sequelize.define(
  "Drug",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "tn_drugs",
    timestamps: false, // Assuming you don't have createdAt/updatedAt columns
  }
);

module.exports = Drug;
