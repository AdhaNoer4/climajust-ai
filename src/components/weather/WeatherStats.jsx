import { Wind, Droplets, CloudRain } from "lucide-react";

export default function WeatherStats({ weatherData }) {
  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="bg-white rounded-2xl p-4 shadow text-center">
        <Wind className="mx-auto text-sky-500 mb-1" size={20} />
        <p className="text-xs text-gray-500">Angin</p>
        <p className="font-semibold">{weatherData?.windSpeed || "12 km/h"}</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow text-center">
        <Droplets className="mx-auto text-sky-500 mb-1" size={20} />
        <p className="text-xs text-gray-500">Kelembapan</p>
        <p className="font-semibold">{weatherData?.humidity || "70%"}</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow text-center">
        <CloudRain className="mx-auto text-sky-500 mb-1" size={20} />
        <p className="text-xs text-gray-500">Hujan</p>
        <p className="font-semibold">40%</p>
      </div>

    </div>
  );
}