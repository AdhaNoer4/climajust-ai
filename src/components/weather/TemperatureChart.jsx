import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TemperatureChart({ weatherData }) {
  const forecast = weatherData?.forecast || [];

  const chartData = forecast.slice(0, 8).map(f => ({
    time: f.time ? new Date(f.time).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "--",
    temp: parseFloat(f.temp) || 0,
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-semibold mb-4">Grafik Suhu Hari Ini</h3>
      {chartData.length === 0 ? (
        <p className="text-sm text-gray-400 text-center">Data tidak tersedia</p>
      ) : (
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val) => [`${val}°C`, "Suhu"]} />
              <Line type="monotone" dataKey="temp" stroke="#0ea5e9" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}