const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config.js");

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    record_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    record_type: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tn_patient", // references the Patient model
        key: "id",
      },
    },
    is_read: {
      type: DataTypes.INTEGER, // You may want to use BOOLEAN depending on your logic
      allowNull: true,
      defaultValue: 0, // Default to unread
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "tn_notifications",
    timestamps: false, // Disable default createdAt/updatedAt columns if using custom names
  }
);

module.exports = Notification;
