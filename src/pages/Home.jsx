import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import HeroWeather from "../components/home/HeroWeather";
import ImpactSidebar from "../components/home/ImpactSidebar";
import RiskMap from "../components/home/RiskMap";
import CityDetailSidebar from "../components/home/CityDetailSidebar";
import BgAwan  from "../components/BgAwan";
import AIChat from "../components/home/AIChat";
import Footer from "../components/layout/Footer";


// Mapping nama kota ke kode ADM4
const locationToAdm4 = {
  "Kemayoran, Jakarta Pusat": "31.71.03.1001",
  "Jebres, Surakarta": "33.72.04.1005",
  "Laweyan, Surakarta": "33.72.01.1002",
};

// Data koordinat per kode ADM4
const cityMetadata = {
  "31.71.03.1001": {
    name: "Kemayoran, Jakarta Pusat",
    lat: -6.1647,
    lng: 106.8454,
  },
  "33.72.04.1005": {
    name: "Jebres, Surakarta",
    lat: -7.5586,
    lng: 110.8216,
  },
  "33.72.01.1002": {
    name: "Laweyan, Surakarta",
    lat: -7.5662,
    lng: 110.8165,
  },
};

// Data dummy sebagai fallback jika API BPS gagal
const getFallbackPopulation = (adm4Code) => {
  const fallbackData = {
    "31.71.03.1001": { total: 500000, tahun: 2023, sumber: "Estimasi" },
    "33.72.04.1005": { total: 500000, tahun: 2023, sumber: "Estimasi" },
    "33.72.01.1002": { total: 300000, tahun: 2023, sumber: "Estimasi" },
  };
  return fallbackData[adm4Code] || { total: 0, tahun: 2023, sumber: "Estimasi" };
};

// Fetch data populasi dari BPS dengan fallback otomatis
// Di dalam Home.jsx, fungsi fetchPopulationData
const fetchPopulationData = async (adm4Code) => {
  try {
    console.log(`📡 Fetching BPS untuk kode: ${adm4Code}`);
    const response = await fetch(`http://localhost:5000/api/bps/penduduk/${adm4Code}?tahun=2023`);

    const data = await response.json();
    console.log("📦 Data BPS dari backend:", data); // <-- LIHAT INI DI CONSOLE BROWSER

    if (!response.ok) {
      throw new Error(data.error || "Gagal mengambil data BPS");
    }

    // Data sudah diformat oleh backend
    return {
      total: data.total || 0,
      tahun: data.tahun || 2023,
      satuan: data.satuan || "Jiwa",
      sumber: data.sumber || "BPS",
      label: data.label || "Jumlah Penduduk",
    };
  } catch (error) {
    console.error("Error fetching BPS:", error);
    // Fallback
    return { total: 0, tahun: 2023, sumber: "Estimasi", satuan: "Jiwa" };
  }
};

export default function Home({ selectedLocation, onSearchLocation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data cuaca
        const weatherResponse = await fetch(`http://localhost:5000/api/weather/adm4/${selectedLocation.adm4Code}`);
        if (!weatherResponse.ok) throw new Error("Gagal mengambil data cuaca");
        const weather = await weatherResponse.json();

        // Fetch data populasi dari BPS (dengan fallback otomatis)
        const population = await fetchPopulationData(selectedLocation.adm4Code);

        // Gabungkan data cuaca + metadata kota + populasi
        const combinedData = {
          ...weather,
          ...cityMetadata[selectedLocation.adm4Code],
          population,
        };

        setWeatherData(combinedData);
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

  // Handler pencarian dari Navbar
  const handleCitySelect = (cityName) => {
    const adm4Code = locationToAdm4[cityName];
    if (adm4Code) {
      onSearchLocation({ adm4Code, cityName });
    } else {
      alert(`Kota "${cityName}" tidak ditemukan`);
    }
  };

  // Format jumlah penduduk dari struktur baru { total, tahun, sumber }
  const formatPopulation = (popData) => {
    if (!popData || !popData.total) return "N/A";
    const total = popData.total;
    if (total >= 1_000_000) return (total / 1_000_000).toFixed(1) + " Juta";
    if (total >= 1_000) return (total / 1_000).toFixed(0) + " Ribu";
    return total.toString();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-sky-100">
        <Navbar onSelectCity={handleCitySelect} />
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

  // Metadata kota diperkaya dengan data populasi
  const enrichedMetadata = {
    ...cityMetadata[selectedLocation.adm4Code],
    population: formatPopulation(populationData),
    populationYear: populationData?.tahun,
    populationSource: populationData?.sumber,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-sky-200 to-sky-100">
      <Navbar onSelectCity={handleCitySelect} />
        <BgAwan />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 space-y-6">
        <HeroWeather weatherData={weatherData} cityName={selectedLocation.cityName} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map (Mobile tampil pertama) */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <RiskMap center={[cityMetadata[selectedLocation.adm4Code]?.lat || -6.1647, cityMetadata[selectedLocation.adm4Code]?.lng || 106.8454]} weatherData={weatherData} metadata={enrichedMetadata} />
          </div>

          {/* Detail kota */}
          <div className="order-2 lg:order-3 lg:col-span-3">
            <CityDetailSidebar weatherData={weatherData} metadata={enrichedMetadata} />
          </div>

          {/* Dampak */}
          <div className="order-3 lg:order-1 lg:col-span-3">
            <ImpactSidebar weatherData={weatherData} />
          </div>
        </section>

        <AIChat weatherData={weatherData} cityName={selectedLocation.cityName} />
      </main>

      <Footer />
    </div>
  );
}
