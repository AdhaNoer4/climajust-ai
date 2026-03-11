import { useState, useEffect } from "react";

const riskLabel = { low: "Rendah", medium: "Sedang", high: "Tinggi" };
const riskColor = { low: "text-green-600", medium: "text-orange-500", high: "text-red-600" };

export default function RiskTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:5000/api/laporan/validated")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setData(data);
      } else {
        setData([]);
      }
      setLoading(false);
    })
    .catch(() => {
      setData([]);
      setLoading(false);
    });
}, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Daftar Wilayah Risiko Tervalidasi</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="p-3">Wilayah</th>
            <th className="p-3">Jumlah Laporan</th>
            <th className="p-3">Level Risiko</th>
            <th className="p-3">Terakhir Dilaporkan</th>
            <th className="p-3">Detail</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-400">Memuat data...</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-400">Belum ada wilayah tervalidasi</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3 font-medium">{item.address}</td>
                <td className="p-3">{item.jumlah_laporan} laporan</td>
                <td className={`p-3 font-semibold ${riskColor[item.risk_level]}`}>
                  {riskLabel[item.risk_level]}
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(item.terakhir_laporan).toLocaleString("id-ID", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                  })}
                </td>
                <td className="p-3">
                  <button className="bg-orange-400 text-white px-3 py-1 rounded-lg hover:bg-orange-500">
                    Lihat
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}