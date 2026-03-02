const axios = require('axios');

const BASE_URL = 'https://api.bmkg.go.id/publik/prakiraan-cuaca';

const fetchWeatherByAdm4 = async (adm4Code) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        adm4: adm4Code
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Gagal mengambil data cuaca untuk kode wilayah ${adm4Code}: ${error.message}`);
  }
};

module.exports = {
  fetchWeatherByAdm4
};