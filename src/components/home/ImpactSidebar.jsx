export default function ImpactSidebar() {
  return (
    <aside className="space-y-4">
      <ImpactCard />
      <RecommendationCard />
    </aside>
  )
}

function ImpactCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-3">
      <h3 className="font-semibold text-slate-800">
        Dampak <span className="text-sky-600">Potensial</span>
      </h3>

      <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-medium w-fit">
        ⚠️ Risiko Tinggi
      </div>

      <ul className="space-y-2 text-sm text-slate-700">
        <li className="flex items-center gap-2">🌧️ Hujan Lebat</li>
        <li className="flex items-center gap-2">🌬️ Angin Kencang</li>
        <li className="flex items-center gap-2">🌳 Pohon Tumbang</li>
      </ul>

      <button className="text-xs text-sky-600 hover:underline">
        Dampak lainnya →
      </button>
    </div>
  )
}

function RecommendationCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-3">
      <div className="flex items-center gap-2 font-semibold text-slate-800">
        🤖 Rekomendasi AI
      </div>

      <ul className="space-y-2 text-sm text-slate-700">
        <li className="flex gap-2">✅ Hindari area rendah rawan genangan</li>
        <li className="flex gap-2">🧥 Siapkan jas hujan sebelum beraktivitas</li>
        <li className="flex gap-2">⏱️ Pantau informasi cuaca setiap 2 jam</li>
      </ul>

      <div className="bg-sky-50 text-sky-700 text-xs rounded-lg p-2">
        💡 Rekomendasi disesuaikan dengan kondisi cuaca & wilayah Anda
      </div>
    </div>
  )
}