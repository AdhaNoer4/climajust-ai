import { useState, useEffect } from "react";
import RiskFilterBar from "../components/risk/RiskFilterBar";
import RiskStatsSidebar from "../components/risk/RiskStatsSidebar";
import RiskMapContainer from "../components/risk/RiskMapContainer";
import RiskTable from "../components/risk/RiskTable";
import BgAwan from "../components/BgAwan";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useLocationSearch } from "../hooks/useLocationSearch";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// ✅ Sama persis dengan di Home.jsx
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
    const response = await fetch(`http://localhost:5000/api/locations/${adm4Code}/populasi`);
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

export default function PetaRisiko({ selectedLocation, onSearchLocation, user, onLoginSuccess, onLogout }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/weather/adm4/${selectedLocation.adm4Code}`);
        if (!res.ok) throw new Error("Gagal fetch cuaca");
        const weather = await res.json();

        // ✅ Pakai fetchPopulationData dengan fallback
        const population = await fetchPopulationData(
          selectedLocation.adm4Code,
          selectedLocation.cityName
        );

        setWeatherData({ ...weather, population });
      } catch (err) {
        console.error(err);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedLocation.adm4Code]);

 const handleCitySelect = useLocationSearch(
  (loc) => onSearchLocation({
    adm4Code: loc.adm4_code,
    cityName: loc.name,
    lat: loc.lat,
    lng: loc.lng,
  }),
  (query) => {
    const name = typeof query === "string" ? query : query?.name;
    console.warn(`Lokasi "${name}" tidak ditemukan`);
  }
);
  const center = [selectedLocation.lat, selectedLocation.lng];
  const metadata = {
    name: selectedLocation.cityName,
    lat: selectedLocation.lat,
    lng: selectedLocation.lng,
  };

 return (
  <div className="relative min-h-screen bg-gradient-to-b from-blue-400 via-sky-200 to-sky-100">

    {/* Background Awan */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <BgAwan />
    </div>

    {/* Konten */}
    <div className="relative z-10 space-y-6">
      <Navbar
      onSelectCity={handleCitySelect}
      user={user}
      onLoginSuccess={onLoginSuccess}
      onLogout={onLogout}
    />

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-6 space-y-6">
        <RiskFilterBar weatherData={weatherData} metadata={metadata} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <RiskStatsSidebar weatherData={weatherData} />
          </div>

          <div className="lg:col-span-9 order-1 lg:order-2">
            {loading ? (
              <div className="h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl bg-white/50 animate-pulse" />
            ) : (
              <RiskMapContainer
                center={center}
                weatherData={weatherData}
                metadata={metadata}
              />
            )}
          </div>
        </div>

        <RiskTable />
      </main>

      <Footer />
    </div>

  </div>
);
}