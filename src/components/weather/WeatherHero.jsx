import { MapPin, ArrowUp, ArrowDown } from "lucide-react";
import WeatherIcon from "../home/WeatherIcon";

export default function WeatherHero({ weatherData, cityName }) {
  const weather = weatherData?.weather;
  
  // Ambil max & min dari forecast hari ini
  const todayForecast = weatherData?.forecast?.slice(0, 8) || [];
  const temps = todayForecast.map(f => parseFloat(f.temp));
  const maxTemp = temps.length ? Math.max(...temps) : null;
  const minTemp = temps.length ? Math.min(...temps) : null;

  return (
    <div className="pt-14 pb-20 text-center text-white relative">
      <WeatherIcon description={weather?.description || "clear-day"} className="w-28 mx-auto mb-3" />
      <h1 className="text-5xl font-bold">{weather?.temp || "--"}</h1>
      <p className="text-lg opacity-90">{weather?.description || "--"}</p>
      <div className="flex items-center justify-center gap-2 mt-2 opacity-80">
        <MapPin size={16} />
        <span className="text-sm">{cityName}</span>
      </div>
      <p className="flex justify-center gap-3 text-sm mt-3 opacity-80">
        <span className="flex items-center gap-1">
          <ArrowUp size={14} />{maxTemp ? `${maxTemp}°` : "--"}
        </span>
        <span className="flex items-center gap-1">
          <ArrowDown size={14} />{minTemp ? `${minTemp}°` : "--"}
        </span>
      </p>
    </div>
  );
}