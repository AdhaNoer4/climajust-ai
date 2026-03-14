import { useState, useEffect } from "react";

const riskLabel = { low: "Rendah", medium: "Sedang", high: "Tinggi" };
const riskColor = { low: "text-green-600", medium: "text-orange-500", high: "text-red-600" };

export default function RiskTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/laporan/validated")
      .then((res) => res.json())
      .then((data) => {
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
      <div className="hidden md:block overflow-x-auto">
        <table className="hidden md:table w-full text-sm">
          <thead>
            <tr className="bg-blue-100 text-left ">
              <th className="px-4 py-3">Wilayah</th>
              <th className="px-4 py-3">Jumlah Laporan</th>
              <th className="px-4 py-3">Level Risiko</th>
              <th className="px-4 py-3">Terakhir Dilaporkan</th>
              <th className="px-4 py-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  Belum ada wilayah tervalidasi
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 font-medium">{item.address}</td>
                  <td className="p-3">{item.jumlah_laporan} laporan</td>
                  <td className={`p-3 font-semibold ${riskColor[item.risk_level]}`}>{riskLabel[item.risk_level]}</td>
                  <td className="p-3 text-gray-500">
                    {new Date(item.terakhir_laporan).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3">
                    <button className="bg-orange-400 text-white px-3 py-1 rounded-lg hover:bg-orange-500">Lihat</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <div className="text-center text-gray-400 py-4">Memuat data...</div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-400 py-4">Belum ada wilayah tervalidasi</div>
        ) : (
          data.map((item, index) => (
            <div key={index} className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="font-semibold text-slate-800 mb-1">{item.address}</div>

              <div className="text-sm text-gray-600 mb-2">{item.jumlah_laporan} laporan</div>

              <div className={`text-sm font-semibold mb-2 ${riskColor[item.risk_level]}`}>Risiko {riskLabel[item.risk_level]}</div>

              <div className="text-xs text-gray-500 mb-3">
                {new Date(item.terakhir_laporan).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <button className="w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500">Lihat</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
