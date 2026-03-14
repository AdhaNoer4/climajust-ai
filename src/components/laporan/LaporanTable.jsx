import { useState, useEffect } from "react";
import RiskBadge from "./RiskBadge";
import StatusBadge from "./StatusBadge";

export default function LaporanTable({refreshKey}) {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    setLoading(true);
    // Gunakan variabel env
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    
    fetch(`${apiUrl}/laporan`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refreshKey]);

  // Format tanggal: "16:10 Selasa"
  function formatWaktu(dateStr) {
    const date = new Date(dateStr);
    const jam = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const hari = date.toLocaleDateString("id-ID", { weekday: "long" });
    return `${jam} ${hari}`;
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md overflow-hidden">
      <h2 className="text-xl font-semibold p-6">Daftar Laporan</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-blue-200 text-gray-800">
            <tr>
              <th className="p-4">Waktu</th>
              <th className="p-4">Wilayah</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Risiko</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">Memuat data...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">Belum ada laporan</td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4 text-sm text-gray-500">{formatWaktu(item.created_at)}</td>
                  <td className="p-4 font-semibold">{item.address}</td>
                  <td className="p-4">{item.deskripsi}</td>
                  <td className="p-4"><RiskBadge level={item.risk_level} /></td>
                  <td className="p-4"><StatusBadge status={item.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}