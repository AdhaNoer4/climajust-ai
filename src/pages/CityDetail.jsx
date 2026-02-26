import RiskMap from "../components/map/RiskMap"

export default function CityDetail() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Jebres, Surakarta
          </h1>
          <p className="text-sm text-slate-600">
            Pembaruan terakhir: 26 Februari 2026 • 09:00 WIB
          </p>
        </div>

        <span className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-medium w-fit">
          Risiko Tinggi
        </span>
      </section>

      {/* Weather Summary */}
      <section className="bg-white rounded-2xl shadow p-5 grid sm:grid-cols-3 gap-4">
        <WeatherItem label="Suhu" value="29°C" icon="🌡️" />
        <WeatherItem label="Kelembapan" value="85%" icon="💧" />
        <WeatherItem label="Cuaca" value="Hujan Lebat" icon="🌧️" />
      </section>

      {/* Dampak Sosial */}
      <section className="bg-white rounded-2xl shadow p-5 space-y-3">
        <h2 className="font-semibold text-slate-800">
          Dampak terhadap Kelompok Rentan
        </h2>

        <ul className="space-y-2 text-sm text-slate-700">
          <li>🌾 Petani berisiko gagal panen akibat curah hujan tinggi</li>
          <li>🛵 Buruh harian berpotensi kehilangan jam kerja</li>
          <li>🏘️ Warga bantaran sungai rawan genangan</li>
        </ul>
      </section>

      {/* Rekomendasi AI */}
      <section className="bg-sky-50 border border-sky-100 rounded-2xl p-5 space-y-3">
        <h2 className="font-semibold text-sky-800 flex items-center gap-2">
          🤖 Rekomendasi AI
        </h2>

        <ul className="space-y-2 text-sm text-sky-700">
          <li>✅ Prioritaskan bantuan logistik untuk wilayah rawan banjir</li>
          <li>⏱️ Tunda aktivitas luar ruang setelah pukul 14.00</li>
          <li>📢 Sebarkan peringatan dini ke warga sekitar sungai</li>
        </ul>

        <p className="text-xs text-sky-600">
          Rekomendasi dihasilkan berdasarkan analisis cuaca, kepadatan penduduk, dan kerentanan sosial.
        </p>
      </section>

      {/* Mini Risk Map */}
      <section>
        <RiskMap />
      </section>

    </div>
  )
}

function WeatherItem({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  )
}