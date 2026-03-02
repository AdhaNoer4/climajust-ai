const weatherService = require('../services/weatherService');

const getWeatherByAdm4 = async (req, res) => {
  try {
    const { adm4Code } = req.params;
    
    // Validasi format adm4
    const adm4Pattern = /^\d{2}\.\d{2}\.\d{2}\.\d{4}$/;
    if (!adm4Pattern.test(adm4Code)) {
      return res.status(400).json({ 
        error: 'Format kode adm4 tidak valid. Gunakan format: 12.34.56.7890' 
      });
    }

    const weatherData = await weatherService.fetchWeatherByAdm4(adm4Code);
    
    // Ambil data cuaca terkini
    const currentWeather = weatherData.data[0].cuaca[0][0];
    
    // Format data sesuai kebutuhan frontend
    const formattedData = {
      location: {
        province: weatherData.lokasi.provinsi,
        city: weatherData.lokasi.kotkab,
        district: weatherData.lokasi.kecamatan,
        village: weatherData.lokasi.desa,
        coordinates: {
          lat: weatherData.lokasi.lat,
          lon: weatherData.lokasi.lon
        }
      },
      weather: {
        temp: currentWeather.t + '°C',
        humidity: currentWeather.hu,
        wind: currentWeather.ws + ' km/jam',
        description: currentWeather.weather_desc,
        description_en: currentWeather.weather_desc_en,
        time: currentWeather.local_datetime,
        icon: currentWeather.image  // PASTIKAN INI ADA
      },
      forecast: weatherData.data[0].cuaca.map(dayData => 
        dayData.map(hourData => ({
          time: hourData.local_datetime,
          temp: hourData.t + '°C',
          humidity: hourData.hu,
          wind: hourData.ws + ' km/jam',
          description: hourData.weather_desc,
          icon: hourData.image  // DAN INI JUGA
        }))
      ).flat()
    };
    
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ 
      error: 'Gagal mengambil data cuaca',
      message: error.message 
    });
  }
};

module.exports = {
  getWeatherByAdm4
};