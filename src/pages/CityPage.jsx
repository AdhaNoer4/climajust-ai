import { useParams } from "react-router-dom";
import RiskMap from "../components/home/RiskMap";
import CityDetailSidebar from "../components/home/CityDetailSidebar";
import AIChat from "../components/home/AIChat";

const cityData = {
  jebres: {
    name: "Jebres, Surakarta",
    risk: "high",
    temp: "29°C",
    weather: "Hujan Lebat",
  },
  laweyan: {
    name: "Laweyan, Surakarta",
    risk: "medium",
    temp: "30°C",
    weather: "Berawan",
  },
};

export default function CityPage() {
  const { cityId } = useParams();
  const city = cityData[cityId];

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <div className="lg:col-span-2">
        <RiskMap activeCity={cityId} />
      </div>

      <div className="lg:col-span-1">
        <CityDetailSidebar city={city} />
      </div>

      <div className="lg:col-span-1">
        <AIChat city={city} />
      </div>
    </div>
  );
}
