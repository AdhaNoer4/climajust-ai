const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { nama, email, password, pekerjaan, lokasi } = req.body;

    if (!nama || !email || !password || !pekerjaan) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    // Cek email sudah terdaftar
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (nama, email, password, pekerjaan, lokasi) VALUES (?, ?, ?, ?, ?)",
      [nama, email, hashedPassword, pekerjaan, lokasi || null]
    );

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (err) {
    console.error("❌ Error register:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib diisi" });
    }

    // Cek email
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    const user = rows[0];

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        pekerjaan: user.pekerjaan,
        lokasi: user.lokasi,
      },
    });
  } catch (err) {
    console.error("❌ Error login:", err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;