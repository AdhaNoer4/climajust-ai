require("dotenv").config();
const express = require('express');
const fs = require("fs");
const cors = require('cors');
const db = require('./config/db'); // ✅ pakai require, bukan import
const weatherRoutes = require('./routes/weather');
const bpsRoutes = require('./routes/bps');
const chatRouter = require("./routes/chat");
const locationsRoutes = require('./routes/locations'); // tambahkan ini
const laporanRoutes = require('./routes/laporan');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("📁 Folder uploads dibuat");
}
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/bps', bpsRoutes);
app.use("/api/chat", chatRouter);
app.use('/api/locations', locationsRoutes); // tambahkan ini
app.use('/uploads', express.static('uploads'));
app.use('/api/laporan', laporanRoutes);
app.use('/api/auth', authRoutes);
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API is running' });
});

// ✅ Contoh route users (opsional, hapus jika tidak perlu)
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ listen hanya sekali
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});