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

router.get("/:adm4_code/populasi", async (req, res) => {
  try {
    const { adm4_code } = req.params;
    const [rows] = await db.query(
      "SELECT adm4_code, nama, populasi FROM lokasi WHERE adm4_code = ?",
      [adm4_code]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Lokasi tidak ditemukan" });
    res.json({
      total: rows[0].populasi || 0,
      tahun: 2023,
      satuan: "Jiwa",
      sumber: "Estimasi (Data Lokal)",
      label: `Jumlah Penduduk ${rows[0].nama}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});