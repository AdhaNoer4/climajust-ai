const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});

const testConnection = async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL terhubung!");
    conn.release();
  } catch (err) {
    console.error("❌ Gagal konek MySQL:", err.message);
  }
};

testConnection();

module.exports = db;