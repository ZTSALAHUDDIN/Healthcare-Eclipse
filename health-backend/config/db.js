// config/db.js
import mysql from "mysql2";

// Replace these with your MySQL device credentials
const db = mysql.createConnection({
  host: "10.226.94.117",
  user: "health_user",
  password: "root",
  database: "health",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

export default db;