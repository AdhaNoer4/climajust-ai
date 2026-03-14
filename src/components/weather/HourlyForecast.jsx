import WeatherIcon from "../home/WeatherIcon";
export default function HourlyForecast() {

  const hours = [
    { time: "09", icon: "clear-day.svg", temp: 27 },
    { time: "10", icon: "partly-cloudy.svg", temp: 28 },
    { time: "11", icon: "partly-cloudy.svg", temp: 29 },
    { time: "12", icon: "clear-day.svg", temp: 30 },
    { time: "13", icon: "clear-day.svg", temp: 31 },
    { time: "14", icon: "rain.svg", temp: 30 },
    { time: "15", icon: "rain.svg", temp: 29 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-5">

      <h3 className="font-semibold mb-4">
        Prakiraan 24 Jam
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-2">

        {hours.map((h, i) => (
          <div
            key={i}
            className="flex flex-col items-center min-w-[60px]"
          >
            <p className="text-xs text-gray-500">
              {h.time}
            </p>

            <WeatherIcon description={h.icon} className="w-8 my-1" />

            <p className="text-sm font-semibold">
              {h.temp}°
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}