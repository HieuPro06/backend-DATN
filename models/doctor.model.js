const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config.js"); // Adjust this path to your Sequelize configuration

const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    active: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    update_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    speciality_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tn_specialities", // The table name you are referencing
        key: "id",
      },
    },
    // room_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "tn_rooms", // The table name you are referencing
    //     key: "id",
    //   },
    // },
    recovery_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "tn_doctors", // Table name if different from the model name
    timestamps: false, // Disables Sequelize's automatic `createdAt` and `updatedAt` columns
  }
);

module.exports = Doctor;
