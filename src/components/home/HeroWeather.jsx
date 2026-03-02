import { CircleFadingPlus, TriangleAlert, Droplet, Wind, ArrowUp, ArrowDown } from "lucide-react";
import weatherIcon from "../../assets/weather/partly-cloudy-day-rain.svg";

export default function HeroWeather({ city }) {
  return (
    <section className=" pb-20">
      <main
        className="relative overflow-visible rounded-2xl 
      bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600
      text-white shadow-lg
      transition-all duration-300 hover:scale-[1.01]"
      >
        {/* Cloud Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Cloud 1 */}
          <div
            className="
    absolute top-16 left-20
    w-96 h-40
    bg-white/50
    rounded-full
    blur-3xl
    animate-cloud-slow
    animate-cloud-float
  "
          />

          {/* Cloud 2 */}
          <div
            className="
    absolute top-40 left-10
    w-72 h-32
    bg-white/45
    rounded-full
    blur-2xl
    animate-cloud-medium
    animate-cloud-float
  "
          />
        </div>

        <div className="relative z-10 p-6 md:p-8 pb-32 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="text-sm opacity-90 flex items-center gap-2">
              <CircleFadingPlus size={20} />
              Status Cuaca Hari Ini
            </div>

            <h1 className="text-3xl font-bold">{city.name}</h1>

            <p className="text-sm opacity-90">Kamis, 19 Februari 2026</p>

            <div className="relative mt-6">
              <div
                className=" absolute
      left-0
      top-full
      
      bg-white text-slate-800
      rounded-xl p-5
      max-w-lg
      shadow-2xl
      transition hover:-translate-y-1 hover:shadow-3xl"
              >
                <div className="flex items-center gap-2 text-red-600 font-semibold">
                  <TriangleAlert size={20} color="#ff3838" />
                  RISIKO {city.risk.toUpperCase()}
                </div>

                <p className="text-sm mt-1 leading-relaxed">Potensi hujan lebat disertai angin kencang. Waspada untuk aktivitas luar ruangan.</p>

                <button className="mt-3 text-sm font-medium text-sky-600 hover:underline">Lihat Detail Cuaca →</button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center md:justify-end md:pr-10 gap-6">
            <div className="animate-bounce-slow">
              <img src={weatherIcon} alt="Weather icon" className="w-40 h-40" />
            </div>

            <div className="text-right">
              <div className="text-5xl font-bold">{city.temp}</div>

              <div className="flex justify-end gap-3 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  <ArrowUp size={14} /> 31°
                </span>
                <span className="flex items-center gap-1">
                  <ArrowDown size={14} /> 28°
                </span>
              </div>

              <div className="mt-3 space-y-2 text-sm opacity-90">
                <div className="flex items-center justify-end gap-2">
                  <Droplet size={16} />
                  {city.humidity || 80}%
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Wind size={16} />
                  {city.wind}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
