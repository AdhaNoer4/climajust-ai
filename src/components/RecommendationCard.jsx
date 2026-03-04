import { Bot, CircleCheckBig, Lightbulb } from "lucide-react";

export default function RecommendationCard({ weatherData }) {
  const recommendations =
    weatherData?.recommendations || [
      "Hindari area rawan genangan",
      "Siapkan jas hujan sebelum beraktivitas",
      "Pantau informasi cuaca setiap 2 jam",
    ];

  return (
    <div className="relative bg-white rounded-2xl shadow mt-7 p-4 pt-6 space-y-3">
      <div className="absolute -top-4 left-0 right-0">
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-3 py-2 text-sm font-medium rounded-t-2xl">
          <Bot size={16} />
          Rekomendasi AI
        </div>
      </div>

      <ul className="space-y-2 text-sm text-slate-700">
        {recommendations.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <CircleCheckBig size={16} className="text-green-500" /> {item}
          </li>
        ))}
      </ul>

      <div className="bg-sky-50 text-sky-700 text-xs rounded-lg p-2">
        <Lightbulb size={14} className="inline mr-1 text-yellow-300" /> Rekomendasi disesuaikan dengan kondisi cuaca & wilayah Anda
      </div>
    </div>
  );
}
