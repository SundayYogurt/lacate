const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// ใช้ body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ใช้ express.static middleware สำหรับไฟล์ static
app.use(express.static(path.join(__dirname, "public")));

// Route สำหรับ root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Location Collection API");
});

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล MySQL (ใช้ connection pool)
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "location_db",
});

// เส้นทาง POST เพื่อบันทึกตำแหน่ง
app.post("/save-location", (req, res) => {
  const { latitude, longitude } = req.body;

  const sql = "INSERT INTO locations (latitude, longitude) VALUES (?, ?)";
  pool.query(sql, [latitude, longitude], (err, results) => {
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
