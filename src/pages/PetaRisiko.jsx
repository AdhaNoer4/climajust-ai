import { useState, useEffect } from "react";
import RiskFilterBar from "../components/risk/RiskFilterBar";
import RiskStatsSidebar from "../components/risk/RiskStatsSidebar";
import RiskMapContainer from "../components/risk/RiskMapContainer";
import RiskTable from "../components/risk/RiskTable";
import BgAwan  from "../components/BgAwan";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const locationToAdm4 = {
  "Kemayoran, Jakarta Pusat": "31.71.03.1001",
  "Jebres, Surakarta": "33.72.04.1005",
  "Laweyan, Surakarta": "33.72.01.1002",
};

const cityMetadata = {
  "31.71.03.1001": { name: "Kemayoran, Jakarta Pusat", lat: -6.1647, lng: 106.8454 },
  "33.72.04.1005": { name: "Jebres, Surakarta", lat: -7.5586, lng: 110.8216 },
  "33.72.01.1002": { name: "Laweyan, Surakarta", lat: -7.5662, lng: 110.8165 },
};

const DEFAULT_ADM4 = "33.72.04.1005"; // default: Jebres, Surakarta

export default function PetaRisiko() {
  const [selectedAdm4, setSelectedAdm4] = useState(DEFAULT_ADM4);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/api/weather/adm4/${selectedAdm4}`);
      if (!res.ok) throw new Error("Gagal fetch cuaca");
      const weather = await res.json();

      const popRes = await fetch(`http://localhost:5000/api/bps/penduduk/${selectedAdm4}?tahun=2023`);
      const popData = await popRes.json();

      // ✅ Digabung dalam satu setWeatherData
      setWeatherData({
        ...weather,
        ...cityMetadata[selectedAdm4],
        population: {
          total: popData.total || 0,
          tahun: popData.tahun || 2023,
          satuan: popData.satuan || "Jiwa",
          sumber: popData.sumber || "BPS",
          label: popData.label || "",
        }
      });

    } catch (err) {
      console.error(err);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [selectedAdm4]);

  const handleCitySelect = (cityName) => {
    const adm4 = locationToAdm4[cityName];
    if (adm4) setSelectedAdm4(adm4);
  };

  const metadata = cityMetadata[selectedAdm4];
  const center = [metadata.lat, metadata.lng];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-sky-200 to-sky-100 p-6 space-y-6">
      <BgAwan className="w-md" />
      <Navbar onSelectCity={handleCitySelect} />
      <main className="max-w-7xl mx-auto px-4 space-y-6">
        <RiskFilterBar />
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
  );
}