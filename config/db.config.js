const { Sequelize } = require("sequelize");

// Create a Sequelize instance
const sequelize = new Sequelize("doantotnghiep", "root", "password", {
  host: "localhost",
  dialect: "mysql", // Change to 'postgres' for PostgreSQL, etc.
  pool: {
    max: 10, // Max connections in the pool
    min: 0, // Min connections in the pool
    acquire: 30000, // Max time (ms) for a connection attempt before throwing error
    idle: 10000, // Max idle time (ms) for a connection to stay idle before being released
  },
  logging: false, // Disable logging; set to true for debug logging
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = { sequelize };
