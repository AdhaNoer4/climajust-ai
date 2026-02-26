export default function CityDetailSidebar() {
  return (
    <aside className="space-y-4">
      {/* Info Kota */}
      <section className="bg-white rounded-2xl shadow p-4 space-y-2">
        <h3 className="font-semibold text-slate-800">Jebres, Surakarta</h3>
        <p className="text-xs text-slate-500">Update terakhir: 26 Feb 2026 • 09:00 WIB</p>

        <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">Risiko Tinggi</span>
      </section>

      {/* Ringkasan Cuaca */}
      <section className="bg-white rounded-2xl shadow p-4 grid grid-cols-3 gap-3 text-center">
        <WeatherMini label="Suhu" value="29°C" icon="🌡️" />
        <WeatherMini label="Cuaca" value="Hujan" icon="🌧️" />
        <WeatherMini label="Angin" value="18 km/j" icon="🌬️" />
      </section>

      {/* Dampak Sosial */}
      <section className="bg-white rounded-2xl shadow p-4 space-y-2">
        <h4 className="font-semibold text-sm text-slate-800">Dampak Potensial</h4>

        <ul className="space-y-1.5 text-sm text-slate-700">
          <li>🌾 Risiko gagal panen</li>
          <li>🛵 Buruh harian kehilangan jam kerja</li>
          <li>🏘️ Genangan di area bantaran sungai</li>
        </ul>
      </section>

      {/* Peringatan Cuaca Per Jam */}
      <section className="bg-white rounded-2xl shadow p-4 space-y-3">
        <h4 className="font-semibold text-sm text-slate-800">⏰ Peringatan Cuaca Hari Ini</h4>

        <HourlyAlert time="10.00" level="medium" desc="Hujan sedang" />
        <HourlyAlert time="13.00" level="high" desc="Hujan lebat & angin kencang" />
        <HourlyAlert time="17.00" level="medium" desc="Potensi genangan" />
      </section>
    </aside>
  );
}

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
    low: "bg-green-50 text-green-700",
    medium: "bg-yellow-50 text-yellow-700",
    high: "bg-red-50 text-red-700",
  };

  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${color[level]}`}>
      <span className="font-medium">{time}</span>
      <span>{desc}</span>
    </div>
  );
}
