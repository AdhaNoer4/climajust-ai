const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weather');
const bpsRoutes = require('./routes/bps'); // Tambahkan ini

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/bps', bpsRoutes); // Tambahkan ini

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});