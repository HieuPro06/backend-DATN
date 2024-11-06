const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "password",
  database: "doantotnghiep",
  debug: false,
});

const checkDbConnection = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err.message);
    } else {
      console.log("Database connected successfully!");
      connection.release();
    }
  });
};

module.exports = { db, checkDbConnection };
