import { MapPin, ArrowUp, ArrowDown } from "lucide-react";
import WeatherIcon from "../home/WeatherIcon";

export default function WeatherHero({ weatherData, cityName }) {
    

  return (
    <div className="pt-14 pb-20 text-center text-white relative">
      {/* Meteo Icon */}
      <WeatherIcon description={weatherData?.weather?.description || "clear-day"} className="w-28 mx-auto mb-3" />

      <h1 className="text-5xl font-bold">{weatherData?.temperature || "27°"}</h1>

      <p className="text-lg opacity-90">{weatherData?.weather?.description || "Clear Sky"}</p>

      <div className="flex items-center justify-center gap-2 mt-2 opacity-80">
        <MapPin size={16} />
        <span className="text-sm">{cityName}</span>
      </div>

      <p className="flex justify-center text-sm mt-3 opacity-80">
        <span className="flex items-center gap-1">
          <ArrowUp size={14} />
          31°
        </span>
        <span className="flex items-center gap-1">
          <ArrowDown size={14} /> 25°
        </span>
      </p>
    </div>
  );
}
