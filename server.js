require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = process.env.PORT || 3000;

// Middleware เพื่อ parse JSON bodies
app.use(bodyParser.json());
app.use(express.static("public"));

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// เชื่อมต่อกับฐานข้อมูล
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// เส้นทาง POST เพื่อบันทึกตำแหน่ง
app.post("/save-location", (req, res) => {
  const { latitude, longitude } = req.body;

  // สร้างคำสั่ง SQL เพื่อบันทึกข้อมูล
  const sql = "INSERT INTO locations (latitude, longitude) VALUES (?, ?)";
  connection.query(sql, [latitude, longitude], (err, results) => {
    if (err) {
      console.error("Error saving location:", err);
      res
        .status(500)
        .json({ status: "error", message: "Failed to save location" });
      return;
    }
    console.log(
      `Saved location: Latitude: ${latitude}, Longitude: ${longitude}`
    );
    res.json({ status: "success", message: "Location saved successfully" });
  });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
