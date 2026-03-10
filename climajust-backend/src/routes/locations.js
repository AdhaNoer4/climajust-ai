const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET semua lokasi
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT adm4_code, nama AS name FROM lokasi ORDER BY nama ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;