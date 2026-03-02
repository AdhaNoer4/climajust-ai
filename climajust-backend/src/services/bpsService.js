const axios = require('axios');

// Konfigurasi API BPS
const BPS_API_KEY = process.env.BPS_API_KEY; // Simpan di .env
const BPS_BASE_URL = 'https://api.bps.go.id'; // Ganti dengan URL API BPS yang sesungguhnya

/**
 * Mendapatkan data jumlah penduduk berdasarkan kode wilayah
 * @param {string} regionCode - Kode wilayah BPS (contoh: 3171 untuk Jakarta Pusat)
 * @returns {Promise<Object>} Data jumlah penduduk
 */
const getPopulationByRegion = async (regionCode) => {
  try {
    // Contoh endpoint - sesuaikan dengan dokumentasi API BPS
    const response = await axios.get(`${BPS_BASE_URL}/api/v1/penduduk`, {
      params: {
        key: BPS_API_KEY,
        wilayah: regionCode,
        tahun: new Date().getFullYear() - 1 // Data tahun sebelumnya
      }
    });

    // Format response sesuai kebutuhan
    return {
      total: response.data.data?.jumlah_penduduk || 0,
      tahun: response.data.data?.tahun,
      sumber: 'BPS'
    };
  } catch (error) {
    console.error('Error fetching BPS data:', error.message);
    // Fallback ke data dummy jika API error
    return {
      total: 0,
      tahun: null,
      sumber: 'Estimasi'
    };
  }
};

/**
 * Mapping dari kode ADM4 BMKG ke kode wilayah BPS
 * Ini perlu disesuaikan dengan data sebenarnya
 */
const adm4ToBpsCode = {
  "31.71.03.1001": "3171031001", // Kemayoran
  "33.72.04.1005": "3372041005", // Jebres
  "33.72.01.1002": "3372011002", // Laweyan
  // Tambahkan mapping lainnya
};

module.exports = {
  getPopulationByRegion,
  adm4ToBpsCode
};