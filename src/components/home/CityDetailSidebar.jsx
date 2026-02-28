export default function CityDetailSidebar({ city }) {
  if (!city) {
    return <aside className="bg-white rounded-2xl shadow p-4 text-sm text-slate-500">Pilih wilayah pada peta untuk melihat detail</aside>;
  }
  return (
    <aside className="space-y-4">
      {/* Info Kota */}
      <section className="bg-white rounded-2xl shadow p-4 space-y-2">
        <h3 className="font-semibold">{city.name}</h3>
        <p className="text-sm text-slate-600">Jumlah Warga: {city.people}</p>
        <p className="text-sm font-medium">Level Risiko: {city.risk}</p>
      </section>

      {/* Ringkasan Cuaca */}
      <section className="bg-white rounded-2xl shadow p-4 grid grid-cols-3 gap-3 text-center">
        <WeatherMini label="Suhu" value={city.temp} icon="🌡️" />
        <WeatherMini label="Cuaca" value={city.weather} icon="🌧️" />
        <WeatherMini label="Angin" value={city.wind} icon="🌬️" />
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
