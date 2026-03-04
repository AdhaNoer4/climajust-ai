const express = require("express");
const axios = require("axios");

const router = express.Router();

// Mapping ADM4 ke parameter BPS
const adm4ToBpsParams = {
  "31.71.03.1001": { 
    domain: "3171", 
    wilayah: "Jakarta Pusat",
    // Kode kecamatan/desa jika perlu
  },
  "33.72.04.1005": { 
    domain: "3372", 
    wilayah: "Jebres, Surakarta" 
  },
  "33.72.01.1002": { 
    domain: "3372", 
    wilayah: "Laweyan, Surakarta" 
  },
};

// Fungsi untuk mendapatkan data penduduk dengan validasi isi
async function getPopulationData(domain, tahun = "2023") {
  const apiKey = process.env.BPS_API_KEY;
  
  try {
    const url = `https://webapi.bps.go.id/v1/api/view/domain/${domain}/var/12/th/${tahun}/key/${apiKey}/`;
    
    const response = await axios.get(url);
    const data = response.data;

    // VALIDASI TAMBAHAN: Cek apakah BPS memberikan error di dalam JSON 200 OK
    if (data && (data.status === "Error" || !data.datacontent && !data.data && !data.result)) {
      console.warn("⚠️ API BPS merespon dengan error atau data kosong:", data);
      return { success: false, error: "Data missing or error in response" };
    }
    
    return { success: true, data: data };
  } catch (error) {
    console.error("❌ Error koneksi BPS:", error.message);
    return { success: false, error: error.message };
  }
}

// Endpoint utama
router.get("/penduduk/:adm4Code", async (req, res) => {
  try {
    const { adm4Code } = req.params;
    const { tahun = "2023" } = req.query;

    const params = adm4ToBpsParams[adm4Code];
    
    // Default: Ambil data BPS jika ada mapping
    let population = 0;
    let source = "BPS";

    if (params) {
      const result = await getPopulationData(params.domain, tahun);
      
      if (result.success) {
        population = extractPopulation(result.data);
      }
      
      // Jika hasil 0 atau gagal, switch ke estimasi
      if (population <= 0) {
        source = "Estimasi (Data BPS tidak tersedia)";
        population = getFallbackPopulation(adm4Code);
      }
    } else {
      source = "Estimasi (Wilayah tidak terdaftar)";
      population = getFallbackPopulation(adm4Code);
    }

    res.json({
      status: "OK",
      total: population,
      tahun: tahun,
      satuan: "Jiwa",
      sumber: source,
      label: params ? `Jumlah Penduduk ${params.wilayah}` : "Jumlah Penduduk (Estimasi)"
    });

  } catch (error) {
    // Catch-all jika terjadi error tak terduga
    res.json({
      status: "OK",
      total: getFallbackPopulation(req.params.adm4Code),
      tahun: "2023",
      satuan: "Jiwa",
      sumber: "Estimasi (Error System)",
      label: "Jumlah Penduduk (Estimasi)"
    });
  }
});

// Fungsi extract & fallback tetap sama seperti sebelumnya...
function extractPopulation(data) {
  if (!data) return 0;
  if (data.datacontent && Array.isArray(data.datacontent)) return parseInt(data.datacontent[0]?.nilai || 0);
  if (data.data && Array.isArray(data.data)) return parseInt(data.data[0]?.nilai || 0);
  if (data.result && Array.isArray(data.result)) return parseInt(data.result[0]?.value || 0);
  return 0;
}

function getFallbackPopulation(adm4Code) {
  const fallback = {
    "31.71.03.1001": 500000,
    "33.72.04.1005": 500000,
    "33.72.01.1002": 300000,
  };
  return fallback[adm4Code] || 0;
}

// Test connection dengan path segments
router.get("/debug-model/:domain", async (req, res) => {
  const { domain } = req.params;
  const apiKey = process.env.BPS_API_KEY;
  
  // STEP 1: Ambil daftar model yang tersedia untuk domain ini
  const url = `https://webapi.bps.go.id/v1/api/list/model/domain/${domain}/key/${apiKey}/`;
  
  try {
    const response = await axios.get(url);
    res.json({ 
      message: "Berhasil mengambil Model List",
      // Hasil ini akan memberitahu kamu 'model_id' yang valid
      data: response.data 
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Endpoint untuk mendapatkan daftar variabel
router.get("/variabel/:domain", async (req, res) => {
  try {
    const { domain } = req.params;
    const apiKey = process.env.BPS_API_KEY;
    
    const url = `https://webapi.bps.go.id/v1/api/list/variabel/data/domain/${domain}/key/${apiKey}/`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching variabel:", error.message);
    res.json({ 
      error: "Gagal mengambil daftar variabel",
      data: null 
    });
  }
});

// Endpoint untuk mendapatkan daftar model
router.get("/model/:domain", async (req, res) => {
  try {
    const { domain } = req.params;
    const apiKey = process.env.BPS_API_KEY;
    
    const url = `https://webapi.bps.go.id/v1/api/list/model/data/domain/${domain}/key/${apiKey}/`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching model:", error.message);
    res.json({ 
      error: "Gagal mengambil daftar model",
      data: null 
    });
  }
});

module.exports = router;