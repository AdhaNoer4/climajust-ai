const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET semua lokasi
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT adm4_code, nama AS name, lat, lng FROM lokasi ORDER BY nama ASC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// GET /api/locations/search?q=jebres
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    const [rows] = await db.query(
      "SELECT adm4_code, nama AS name, lat, lng FROM lokasi WHERE nama LIKE ? ORDER BY nama ASC LIMIT 5",
      [`%${q}%`]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});