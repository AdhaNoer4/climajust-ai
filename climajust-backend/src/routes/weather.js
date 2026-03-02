const express = require('express');
const { getWeatherByAdm4 } = require('../controllers/weatherController');

const router = express.Router();

// Get weather by BMKG adm4 code
// Contoh: /api/weather/adm4/31.71.03.1001 (Kemayoran, Jakarta Pusat)
router.get('/adm4/:adm4Code', getWeatherByAdm4);

// Optional: Search location by name (perlu database mapping)
// router.get('/search/:locationName', searchLocation);

module.exports = router;