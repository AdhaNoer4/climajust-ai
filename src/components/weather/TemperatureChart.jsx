import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { time: "06", temp: 24 },
  { time: "09", temp: 27 },
  { time: "12", temp: 30 },
  { time: "15", temp: 31 },
  { time: "18", temp: 29 },
  { time: "21", temp: 27 },
];

export default function TemperatureChart() {
  return (
    <div className="bg-white rounded-2xl shadow p-5">

      <h3 className="font-semibold mb-4">
        Grafik Suhu Hari Ini
      </h3>

      <div className="h-40">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <XAxis dataKey="time" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#0ea5e9"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}