const mysql = require("mysql");
const env = process.env;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "contact",
  connectionLimit: 10,
  multipleStatements: true,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL");
  }
  if (connection) connection.release();
  return;
});

module.exports = pool;
