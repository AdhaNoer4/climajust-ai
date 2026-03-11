const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder penyimpanan
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // maks 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format file tidak didukung"));
    }
  },
});

// POST /api/laporan
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { judul, address, adm4Code, deskripsi, riskLevel } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!judul || !adm4Code || !deskripsi || !riskLevel) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    await db.query(
      "INSERT INTO laporan (judul, adm4_code, address, deskripsi, risk_level, photo_url) VALUES (?, ?, ?, ?, ?, ?)",
      [judul, adm4Code, address, deskripsi, riskLevel, photoUrl]
    );
   // ✅ Cek apakah perlu auto-validasi
    await checkAndValidate(adm4Code, riskLevel);
    res.status(201).json({ message: "Laporan berhasil dikirim" });
  } catch (err) {
    console.error("❌ Error laporan:", err);
    res.status(500).json({ error: err.message });
  }
});
async function checkAndValidate(adm4Code, riskLevel) {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS total FROM laporan 
     WHERE adm4_code = ? 
     AND risk_level = ? 
     AND status = 'pending'
     AND created_at >= NOW() - INTERVAL 24 HOUR`,
    [adm4Code, riskLevel]
  );
  const total = rows[0].total;

  if (total >= 3) {
    // Update semua laporan pending di wilayah & risiko yang sama jadi valid
    await db.query(
      `UPDATE laporan SET status = 'valid'
       WHERE adm4_code = ?
       AND risk_level = ?
       AND status = 'pending'
       AND created_at >= NOW() - INTERVAL 24 HOUR`,
      [adm4Code, riskLevel]
    );
    console.log(`✅ Auto-validasi: ${adm4Code} risiko ${riskLevel}`);
  }
}
// GET /api/laporan
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, created_at, address, deskripsi, risk_level, status 
       FROM laporan 
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Error get laporan:", err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/validated", async (req, res) => {
  try {
    const [rows] = await db.query(
  `SELECT adm4_code, address, risk_level, 
          COUNT(*) AS jumlah_laporan,
          MAX(created_at) AS terakhir_laporan
   FROM laporan
   WHERE status = 'valid'
   AND created_at >= UTC_TIMESTAMP() - INTERVAL 24 HOUR
   GROUP BY adm4_code, address, risk_level
   ORDER BY jumlah_laporan DESC`
);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;