import { TriangleAlert } from "lucide-react";
import { determineRisk, getRiskStyle } from "../utils/riskUtils";

export default function ImpactCard({ weatherData }) {
  const description = weatherData?.weather?.description || "";
  const risk = determineRisk(description);
  const gradient = getRiskStyle(risk);

  const impactMap = {
    tinggi: ["Hujan Lebat", "Angin Kencang", "Pohon Tumbang"],
    sedang: ["Hujan Sedang", "Angin Sedang", "Pohon Terhempas"],
    rendah: ["Hujan Ringan", "Angin Ringan", "Kondisi Aman"],
  };

  const impacts = impactMap[risk];

  return (
    <div className="relative bg-white rounded-2xl shadow mt-7 p-4 pt-6 space-y-3">
      <div className="absolute -top-4 left-0 right-0">
        <div
          className={`flex items-center gap-2 bg-gradient-to-r ${gradient} text-white px-3 py-2 text-sm font-medium rounded-t-2xl`}
        >
          <TriangleAlert size={16} />
          Risiko {risk.toUpperCase()}
        </div>
      </div>

      <ul className="space-y-2 text-sm text-slate-700">
        {impacts.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            • {item}
          </li>
        ))}
      </ul>

     
    </div>
  );
}