import WeatherIcon from "../home/WeatherIcon";

export default function HourlyForecast({ weatherData }) {
  const forecast = weatherData?.forecast?.slice(0, 8) || [];

  const formatJam = (datetime) => {
    if (!datetime) return "--";
    const date = new Date(datetime);
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  const parseTemp = (temp) => {
    if (!temp) return "--";
    return typeof temp === "string" ? temp.replace("°C", "") : temp;
  };

  if (forecast.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="font-semibold mb-4">Prakiraan 24 Jam</h3>
        <p className="text-sm text-gray-400 text-center">Data tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-semibold mb-4">Prakiraan 24 Jam</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {forecast.map((h, i) => (
          <div key={i} className="flex flex-col items-center min-w-[60px]">
            <p className="text-xs text-gray-500">{formatJam(h.time)}</p>
            <WeatherIcon description={h.description} className="w-8 my-1" />
            <p className="text-sm font-semibold">{parseTemp(h.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}