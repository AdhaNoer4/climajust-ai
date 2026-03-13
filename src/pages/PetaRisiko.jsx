// components/pages/PetaRisiko.jsx
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
  try {
    const response = await fetch(`${API}/bps/penduduk/${adm4Code}?tahun=2023`);
    const data = await response.json();
    if (!response.ok || !data.total || data.total === 0) {
      throw new Error("Data tidak tersedia");
    }
    return {
      total: data.total,
      tahun: data.tahun || 2023,
      satuan: data.satuan || "Jiwa",
      sumber: data.sumber || "BPS",
      label: data.label || "Jumlah Penduduk",
    };
  } catch (error) {
    const fallback = {
      "33.72.04.1010": { total: 180000 },
      "33.72.01": { total: 95000 },
      "33.72.02": { total: 60000 },
      "33.72.03": { total: 75000 },
      "33.72.05": { total: 160000 },
    };
    const pop = fallback[adm4Code];
    return {
      total: pop?.total || 0,
      tahun: 2023,
      sumber: "Estimasi (Data BPS tidak tersedia)",
      satuan: "Jiwa",
      label: `Jumlah Penduduk ${cityName}`,
    };
  }
};

export default function PetaRisiko({ selectedLocation, onSearchLocation }) {
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
    (loc) => setSelectedLocation({
      adm4Code: loc.adm4_code,
      cityName: loc.name,
      lat: loc.lat,
      lng: loc.lng,
    }),
    (cityName) => console.warn(`Lokasi "${cityName}" tidak ditemukan`)
  );

  const center = [selectedLocation.lat, selectedLocation.lng];
  const metadata = {
    name: selectedLocation.cityName,
    lat: selectedLocation.lat,
    lng: selectedLocation.lng,
  };

 return (
  <div className="relative min-h-screen bg-gradient-to-b from-blue-400 via-sky-200 to-sky-100 overflow-hidden">

    {/* Background Awan */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <BgAwan />
    </div>

    {/* Konten */}
    <div className="relative z-10 space-y-6">
      <Navbar onSelectCity={handleCitySelect} />

      <main className="max-w-7xl mx-auto px-4 space-y-6">
        <RiskFilterBar weatherData={weatherData} metadata={metadata} />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <RiskStatsSidebar weatherData={weatherData} />
          </div>

          <div className="col-span-9">
            {loading ? (
              <div className="h-[500px] rounded-2xl bg-white/50 animate-pulse" />
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