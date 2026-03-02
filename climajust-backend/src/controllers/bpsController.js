const bpsService = require('../services/bpsService');

const getPopulation = async (req, res) => {
  try {
    const { adm4Code } = req.params;
    
    // Mapping ADM4 ke kode BPS
    const bpsCode = bpsService.adm4ToBpsCode[adm4Code];
    
    if (!bpsCode) {
      return res.status(404).json({ 
        error: 'Kode wilayah tidak ditemukan dalam mapping BPS' 
      });
    }

    const populationData = await bpsService.getPopulationByRegion(bpsCode);
    
    res.json({
      adm4Code,
      bpsCode,
      population: populationData.total,
      year: populationData.tahun,
      source: populationData.sumber
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Gagal mengambil data kependudukan',
      message: error.message 
    });
  }
};

module.exports = {
  getPopulation
};