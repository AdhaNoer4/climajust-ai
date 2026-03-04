import { CircleFadingPlus, TriangleAlert, Droplet, Wind, ArrowUp, ArrowDown } from "lucide-react";
import WeatherIcon from "../home/WeatherIcon";

export default function HeroWeather({ weatherData, cityName }) {
  // Format tanggal hari ini secara dinamis
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Tentukan tingkat risiko berdasarkan kondisi cuaca
  const determineRisk = (weather) => {
    if (!weather) return "sedang";

    const desc = weather.description?.toLowerCase() || "";
    if (desc.includes("hujan lebat") || desc.includes("angin kencang")) {
      return "tinggi";
    } else if (desc.includes("hujan") || desc.includes("angin")) {
      return "sedang";
    }
    return "rendah";
  };

  const risk = determineRisk(weatherData?.weather);

  // Skeleton / Loading state
  if (!weatherData) {
    return (
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white shadow-xl p-6 md:p-8 animate-pulse">
        <div className="h-6 w-48 bg-white/30 rounded mb-4" />
        <div className="h-10 w-64 bg-white/30 rounded mb-3" />
        <div className="h-4 w-40 bg-white/20 rounded" />
        <div className="mt-6 h-24 w-full bg-white/20 rounded-xl" />
      </section>
    );
  }
  const isRain = weatherData.weather.description_en?.toLowerCase().includes("rain");

  return (
    <section className=" pb-20">
      <main
        className={`relative overflow-visible rounded-2xl text-white shadow-xl 
      bg-gradient-to-br 
${isRain ? "from-slate-600 via-slate-700 to-slate-800" : "from-sky-400 via-sky-500 to-blue-600"}
      transition-all duration-300 hover:scale-[1.01]`}
      >
        {/* Cloud effects */}

        <div className="relative p-6 md:p-8 pb-32 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="text-sm opacity-90 flex items-center gap-2">
              <CircleFadingPlus size={20} />
              Status Cuaca Hari Ini
            </div>
            <h1 className="text-3xl font-bold">{cityName}</h1>
            <p className="text-sm opacity-90">{today}</p>

            <div className="relative mt-6">
              <div
                className="
            absolute
      left-0
      top-full
      bg-white text-slate-800
      rounded-xl p-5
      max-w-lg
      shadow-sm
      transition hover:-translate-y-1 hover:shadow-3xl
          "
              >
                <div className="flex items-center gap-2 text-red-600 font-semibold">
                  <TriangleAlert size={20} color="#ff3838" /> RISIKO {risk.toUpperCase()}
                </div>
                <p className="text-sm mt-1 leading-relaxed">
                  {weatherData.weather.description || "Cuaca cerah berawan"}
                  {risk === "tinggi" && ". Waspada untuk aktivitas luar ruangan."}
                </p>
                <button className="mt-3 text-sm font-medium text-sky-600 hover:underline">Lihat Detail Cuaca →</button>
              </div>
            </div>
          </div>

          {/* RIGHT - Menggunakan ikon dari BMKG */}
          <div className="flex items-center justify-center md:justify-end md:pr-10 gap-6">
            {/* Ikon dari BMKG */}
            <WeatherIcon description={weatherData.weather.description_en} className="w-24 h-24 object-contain animate-float" />
            <div className="text-right">
              <div className="text-5xl font-bold">{weatherData.weather.temp}</div>
              <div className="flex justify-end gap-3 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  <ArrowUp size={14} />
                  {weatherData.weather.temp_max || "?"}°
                </span>
                <span className="flex items-center gap-1">
                  <ArrowDown size={14} /> {weatherData.weather.temp_min || "?"}°
                </span>
              </div>
              <div className="mt-3 space-y-2 text-sm opacity-90">
                <div className="flex items-center justify-end gap-2">
                  <Droplet size={16} />
                  {weatherData.weather.humidity}%
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Wind size={16} />
                  {weatherData.weather.wind || "0"} km/h
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
