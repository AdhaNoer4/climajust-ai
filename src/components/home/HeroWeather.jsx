export default function HeroWeather() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-lg">
      <div className="relative p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-4">
          <div className="text-sm opacity-90 flex items-center gap-2">☁️ Status Cuaca Hari Ini</div>

          <h1 className="text-3xl font-bold">Jebres, Surakarta</h1>

          <p className="text-sm opacity-90">Kamis, 19 Februari 2026</p>

          <div className="bg-white text-slate-800 rounded-xl p-4 max-w-sm shadow">
            <div className="flex items-center gap-2 text-red-600 font-semibold">⚠️ RESIKO TINGGI</div>

            <p className="text-sm mt-1">Potensi hujan lebat dan angin kencang</p>

            <button className="mt-3 text-sm font-medium text-sky-600 hover:underline">Lihat Detail Cuaca →</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-6">
          <div className="text-6xl">🌦️</div>

          <div className="text-right">
            <div className="text-5xl font-bold">31°</div>
            <div className="text-sm opacity-90">31° / 28°</div>

            <div className="mt-2 text-xs space-y-1 opacity-90">
              <div>💧 80%</div>
              <div>🌬️ 19 km/h</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
