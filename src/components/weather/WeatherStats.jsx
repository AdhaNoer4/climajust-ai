import { Wind, Droplets, CloudRain } from "lucide-react";

export default function WeatherStats({ weatherData }) {
  const weather = weatherData?.weather;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl p-4 shadow text-center">
        <Wind className="mx-auto text-sky-500 mb-1" size={20} />
        <p className="text-xs text-gray-500">Angin</p>
        <p className="font-semibold">{weather?.wind || "--"}</p>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow text-center">
        <Droplets className="mx-auto text-sky-500 mb-1" size={20} />
        <p className="text-xs text-gray-500">Kelembapan</p>
        <p className="font-semibold">{weather?.humidity ? `${weather.humidity}%` : "--"}</p>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow text-center">
        <CloudRain className="mx-auto text-sky-500 mb-1" size={20} />
        <p className="text-xs text-gray-500">Cuaca</p>
        <p className="font-semibold text-xs">{weather?.description || "--"}</p>
      </div>
    </div>
  );
}