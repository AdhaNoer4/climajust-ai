import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import HeroWeather from "../components/home/HeroWeather";
import ImpactSidebar from "../components/home/ImpactSidebar";
import RiskMap from "../components/home/RiskMap";
import CityDetailSidebar from "../components/home/CityDetailSidebar";
import BgAwan from "../components/BgAwan";
import AIChat from "../components/home/AIChat";
import Footer from "../components/layout/Footer";
import { useLocationSearch } from "../hooks/useLocationSearch"; // ✅ tambahkan

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

  // 2. Fallback ke DB
  try {
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

export default function Home({ selectedLocation, onSearchLocation, user, onLoginSuccess, onLogout }) {
  const [weatherData, setWeatherData] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const weatherResponse = await fetch(`${API}/weather/adm4/${selectedLocation.adm4Code}`);
      if (!weatherResponse.ok) throw new Error("Gagal mengambil data cuaca");
      const weather = await weatherResponse.json();

      // ✅ tambahkan cityName
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
    (loc) => onSearchLocation({
      adm4Code: loc.adm4_code,
      cityName: loc.name,
      lat: loc.lat,
      lng: loc.lng,
    }),
    (cityName) => alert(`Kota "${cityName}" tidak ditemukan`)
  );

  const formatPopulation = (popData) => {
    if (!popData || !popData.total) return "N/A";
    const total = popData.total;
    if (total >= 1_000_000) return (total / 1_000_000).toFixed(1) + " Juta";
    if (total >= 1_000) return (total / 1_000).toFixed(0) + " Ribu";
    return total.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-sky-100">
       <Navbar
      onSelectCity={handleCitySelect}
      user={user}
      onLoginSuccess={onLoginSuccess}
      onLogout={onLogout}
    />
        <main className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-white/50 rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3 h-48 bg-white/50 rounded-2xl" />
              <div className="lg:col-span-6 h-48 bg-white/50 rounded-2xl" />
              <div className="lg:col-span-3 h-48 bg-white/50 rounded-2xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ✅ Pakai selectedLocation langsung, tidak pakai cityMetadata
  const enrichedMetadata = {
    name: selectedLocation.cityName,
    lat: selectedLocation.lat,
    lng: selectedLocation.lng,
    population: formatPopulation(populationData),
    populationYear: populationData?.tahun,
    populationSource: populationData?.sumber,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-sky-200 to-sky-100">
         <Navbar
      onSelectCity={handleCitySelect}
      user={user}
      onLoginSuccess={onLoginSuccess}
      onLogout={onLogout}
    />
      <BgAwan />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 space-y-6">
        <HeroWeather weatherData={weatherData} cityName={selectedLocation.cityName} />
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="order-1 lg:order-2 lg:col-span-6">
            {/* ✅ Pakai selectedLocation.lat/lng, tidak pakai cityMetadata */}
            <RiskMap
              center={[selectedLocation.lat || -7.5586, selectedLocation.lng || 110.8216]}
              weatherData={weatherData}
              metadata={enrichedMetadata}
            />
          </div>
          <div className="order-2 lg:order-3 lg:col-span-3">
            <CityDetailSidebar weatherData={weatherData} metadata={enrichedMetadata} />
          </div>
          <div className="order-3 lg:order-1 lg:col-span-3">
        <ImpactSidebar weatherData={weatherData} user={user} />
          </div>
        </section>
        <AIChat weatherData={weatherData} cityName={selectedLocation.cityName} />
      </main>
      <Footer />
    </div>
  );
}