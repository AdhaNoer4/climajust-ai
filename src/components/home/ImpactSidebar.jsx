import ImpactCard from "../ImpactCard";
import RecommendationCard from "../RecommendationCard";

export default function ImpactSidebar({ weatherData }) {
  return (
    <aside className="space-y-4">
      <div className="bg-white rounded-2xl shadow p-4 space-y-6">
        <h3 className="font-semibold text-slate-800">
          Dampak <span className="text-sky-600">Potensial</span>
        </h3>

        <ImpactCard weatherData={weatherData} />
        <RecommendationCard weatherData={weatherData} />
      </div>
    </aside>
  );
}
