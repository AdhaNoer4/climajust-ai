import { Users, ChartColumnBig, AlarmClock } from "lucide-react";
import WeatherIcon from "../home/WeatherIcon";

// Format angka dengan pemisah ribuan (contoh: 1.234.567)
const formatNumber = (num) => {
  if (!num && num !== 0) return "N/A";
  return new Intl.NumberFormat("id-ID").format(num);
};

// Format jumlah penduduk dengan singkatan (contoh: 1.2 Juta / 300 Ribu)
const formatPopulation = (num) => {
  if (!num && num !== 0) return "N/A";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + " Juta";
  if (num >= 1_000) return (num / 1_000).toFixed(0) + " Ribu";
  return num.toString();
};

// ─── Komponen Utama ────────────────────────────────────────────────────────────

export default function CityDetailSidebar({ weatherData, metadata }) {
  if (!weatherData || !metadata) {
    return <aside className="bg-white rounded-2xl shadow p-4 text-sm text-slate-500">Pilih wilayah pada peta untuk melihat detail</aside>;
  }

  const weather = weatherData.weather;

  // Tentukan level risiko berdasarkan deskripsi cuaca
  const determineRisk = (weather) => {
    const desc = weather.description?.toLowerCase() || "";
    if (desc.includes("hujan lebat") || desc.includes("angin kencang") || desc.includes("badai")) {
      return "high";
    } else if (desc.includes("hujan") || desc.includes("angin") || desc.includes("berawan")) {
      return "medium";
    }
    return "low";
  };

  const riskLevel = determineRisk(weather);

  // Prakiraan per jam untuk hari ini
  const todayForecast =
    weatherData.forecast?.filter((item) => {
      const itemDate = new Date(item.time).toDateString();
      const today = new Date().toDateString();
      return itemDate === today;
    }) || [];

  const highRiskAlerts = todayForecast.filter((item) => item.description.toLowerCase().includes("hujan lebat") || item.description.toLowerCase().includes("angin kencang"));

  const mediumRiskAlerts = todayForecast.filter((item) => item.description.toLowerCase().includes("hujan") && !item.description.toLowerCase().includes("lebat"));

  const riskLabelColor = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-green-600",
  };

  const riskLabel = {
    high: "TINGGI",
    medium: "SEDANG",
    low: "RENDAH",
  };

  return (
    <aside className="space-y-4">
      {/* Info Kota & Data Kependudukan BPS */}
      <section className="bg-white rounded-2xl shadow p-4 space-y-2">
        <h3 className="font-semibold">{metadata.name}</h3>
        <p className="text-sm text-slate-600">Provinsi: {weatherData.location?.province}</p>
        <p className="text-sm text-slate-600">Kota: {weatherData.location?.city}</p>
        <p className="text-sm text-slate-600">Kecamatan: {weatherData.location?.district}</p>

        {/* Data Kependudukan dari BPS */}
        {weatherData.population && (
          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">
              <Users size={16} className="inline" /> Jumlah Penduduk
            </p>
            <p className="text-lg font-bold text-blue-900">
              {formatNumber(weatherData.population.total)} {weatherData.population.satuan || "Jiwa"}
            </p>
            <p className="text-xs text-blue-600 flex items-center gap-1">
              <ChartColumnBig size={30} /> Data {weatherData.population.sumber} {weatherData.population.tahun}
              {weatherData.population.label && <span className="italic">({weatherData.population.label})</span>}
            </p>
          </div>
        )}

        <p className={`text-sm font-medium ${riskLabelColor[riskLevel]}`}>Level Risiko: {riskLabel[riskLevel]}</p>
      </section>

      {/* Peringatan Cuaca Per Jam */}
      <section className="bg-white rounded-2xl shadow p-4 space-y-3">
        <h4 className="font-semibold text-sm text-slate-800">
          <AlarmClock size={20} className="inline mr-1 text-red-600" /> Peringatan Cuaca Hari Ini
        </h4>

        {highRiskAlerts.map((alert, index) => (
          <HourlyAlert
            key={index}
            time={new Date(alert.time).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            level="high"
            desc={weather.description}
          />
        ))}

        {mediumRiskAlerts.map((alert, index) => (
          <HourlyAlert
            key={index}
            time={new Date(alert.time).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            level="medium"
            desc={weather.description}
          />
        ))}

        {highRiskAlerts.length === 0 && mediumRiskAlerts.length === 0 && <div className="text-center py-4 text-sm text-slate-500">Tidak ada peringatan cuaca untuk hari ini</div>}
      </section>
    </aside>
  );
}

// ─── Sub-komponen ──────────────────────────────────────────────────────────────

function WeatherMini({ label, value, icon }) {
  return (
    <div className="space-y-1">
      <div className="text-xl">{icon}</div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800 text-sm">{value}</p>
    </div>
  );
}

function HourlyAlert({ time, desc, level }) {
  const color = {
    low: "bg-green-200 text-green-700",
    medium: "bg-yellow-200 text-yellow-700",
    high: "bg-red-200 text-red-700",
  };

  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs ${color[level]}`}>
      {/* Jam */}
      <span className="font-medium w-12">{time}</span>

      {/* Icon Meteo Lokal */}
      <WeatherIcon description={desc} className="w-6 h-6" />
      {/* Deskripsi */}
      <span className="flex-1">{desc}</span>
    </div>
  );
}
