import { useState, useEffect } from "react";

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

  return (
    <section className="
      relative overflow-hidden rounded-2xl
      bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600
      text-white shadow-xl
      transition-all duration-300 hover:scale-[1.01]
    ">
      {/* Cloud effects */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-96 h-32 bg-white/10 rounded-full blur-2xl" />

      <div className="relative p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-4">
          <div className="text-sm opacity-90 flex items-center gap-2">
            ☁️ Status Cuaca Hari Ini
          </div>
          <h1 className="text-3xl font-bold">{cityName}</h1>
          <p className="text-sm opacity-90">{today}</p>
          <div className="
            bg-white text-slate-800 rounded-xl p-4 max-w-sm shadow
            transition hover:shadow-lg hover:-translate-y-1
          ">
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              ⚠️ RISIKO {risk.toUpperCase()}
            </div>
            <p className="text-sm mt-1 leading-relaxed">
              {weatherData.weather.description || "Cuaca cerah berawan"}
              {risk === "tinggi" && ". Waspada untuk aktivitas luar ruangan."}
            </p>
            <button className="mt-3 text-sm font-medium text-sky-600 hover:underline">
              Lihat Detail Cuaca →
            </button>
          </div>
        </div>

        {/* RIGHT - Menggunakan ikon dari BMKG */}
        <div className="flex items-center justify-end gap-6">
          {/* Ikon dari BMKG */}
          {weatherData.weather.icon && (
            <img 
              src={weatherData.weather.icon} 
              alt={weatherData.weather.description}
              className="w-24 h-24 object-contain animate-float"
            />
          )}
          <div className="text-right">
            <div className="text-5xl font-bold">{weatherData.weather.temp}</div>
            <div className="text-sm opacity-90">
              {weatherData.weather.temp_min || "?"}° / {weatherData.weather.temp_max || "?"}°
            </div>
            <div className="mt-2 text-xs space-y-1 opacity-90">
              <div>💧 {weatherData.weather.humidity}%</div>
              <div>🌬️ {weatherData.weather.wind}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}