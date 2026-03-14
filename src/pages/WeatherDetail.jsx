import WeatherHero from "../components/weather/WeatherHero";
import WeatherStats from "../components/weather/WeatherStats";
import TemperatureChart from "../components/weather/TemperatureChart";
import HourlyForecast from "../components/weather/HourlyForecast";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import { useLocationSearch } from "../hooks/useLocationSearch";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fetchPopulationData = async (adm4Code, cityName) => {
  // 1. Coba dari BPS dulu
  try {
    const response = await fetch(`${API}/bps/penduduk/${adm4Code}?tahun=2023`);
    const data = await response.json();
    if (response.ok && data.total && data.total > 0) {
      return {
        total: data.total,
        tahun: data.tahun || 2023,
        satuan: data.satuan || "Jiwa",
        sumber: data.sumber || "BPS",
        label: data.label || "Jumlah Penduduk",
      };
    }
  } catch (_) {}

  // 2. Fallback ke DB ✅ SEKARANG SUDAH AMAN
  try {
    // Gunakan `${API}` bukan "http://localhost:5000/api"
    const response = await fetch(`${API}/locations/${adm4Code}/populasi`);
    const data = await response.json();
    if (response.ok && data.total && data.total > 0) {
      return data;
    }
  } catch (_) {}

  // 3. Tidak ada data sama sekali
  return {
    total: 0,
    tahun: 2023,
    satuan: "Jiwa",
    sumber: "Data tidak tersedia",
    label: `Jumlah Penduduk ${cityName}`,
  };
};

export default function WeatherDetail({ selectedLocation, onSearchLocation, user, onLoginSuccess, onLogout }) {
  
  const [weatherData, setWeatherData] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!selectedLocation) return;

  const fetchData = async () => {
    try {
      setLoading(true);

      const weatherResponse = await fetch(
        `${API}/weather/adm4/${selectedLocation.adm4Code}`
      );

      if (!weatherResponse.ok) throw new Error("Gagal mengambil data cuaca");

      const weather = await weatherResponse.json();

      const population = await fetchPopulationData(
        selectedLocation.adm4Code,
        selectedLocation.cityName
      );

      setWeatherData({ ...weather, population });
      setPopulationData(population);

    } catch (error) {
      console.error("Error fetching data:", error);
      setWeatherData(null);
      setPopulationData(null);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [selectedLocation]);
  // ✅ Pakai hook, tidak hardcode lagi
  const handleCitySelect = useLocationSearch(
    (loc) =>
      onSearchLocation({
        adm4Code: loc.adm4_code,
        cityName: loc.name,
        lat: loc.lat,
        lng: loc.lng,
      }),
    (cityName) => alert(`Kota "${cityName}" tidak ditemukan`),
  );

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-blue-400 via-sky-200 to-sky-100 pb-10">
        <Navbar onSelectCity={handleCitySelect} user={user} onLoginSuccess={onLoginSuccess} onLogout={onLogout} />
        <WeatherHero weatherData={weatherData} cityName={selectedLocation?.cityName} />

        <div className="max-w-6xl mx-auto px-4 -mt-10 space-y-6">
          <WeatherStats weatherData={weatherData} cityName={selectedLocation?.cityName} />

          <TemperatureChart weatherData={weatherData} cityName={selectedLocation?.cityName} />

          <HourlyForecast />
        </div>
      </section>
    );
  }
}
