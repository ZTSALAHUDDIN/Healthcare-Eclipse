// config/db.js
import mysql from "mysql2";

// Replace these with your MySQL device credentials
const db = mysql.createConnection({
  host: "OTHER_DEVICE_IP_OR_HOSTNAME",
  user: "YOUR_DB_USERNAME",
  password: "YOUR_DB_PASSWORD",
  database: "YOUR_DATABASE_NAME",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

export default db;