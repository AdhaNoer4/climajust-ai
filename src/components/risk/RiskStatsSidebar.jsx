import { useState, useEffect } from "react";
import { Users, ChartColumnBig, FileExclamationPoint, MapPin } from "lucide-react";

const formatNumber = (num) => {
  if (!num && num !== 0) return "N/A";
  return new Intl.NumberFormat("id-ID").format(num);
};

export default function RiskStatsSidebar({ weatherData }) {
  const population = weatherData?.population;
  const [stats, setStats] = useState({
    wilayah_risiko_tinggi: 0,
    total_laporan_valid: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/laporan/stats")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) setStats(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow">
        <p className="text-4xl font-bold">{stats.wilayah_risiko_tinggi}</p>
        <p className="text-sm">Wilayah Risiko Tinggi Tervalidasi</p>
      </div>

      {/* Jumlah Warga */}
      <div className="bg-blue-400 rounded-2xl p-6 shadow">
        <div className="text-slate-100">
          <div className="flex items-center gap-2">
            <Users size={30} />
            <p className="text-lg font-bold">
              {population ? `${formatNumber(population.total)} ${population.satuan || "Jiwa"}` : "N/A"}
            </p>
          </div>
          <p className="text-md font-medium text-slate-100 mb-1">Jumlah Warga</p>
        </div>
        {population && (
          <p className="text-xs text-blue-200 flex items-center gap-1 mt-1">
            <ChartColumnBig size={14} />
            Data {population.sumber} {population.tahun}
            {population.label && <span className="italic">({population.label})</span>}
          </p>
        )}
      </div>

      {/* Laporan Tervalidasi */}
      <div className="bg-emerald-400 rounded-2xl p-6 shadow">
        <div className="inline-flex justify-between gap-3">
          <FileExclamationPoint className="text-slate-100" />
          <p className="text-lg font-semibold text-slate-100">
            {stats.total_laporan_valid} Laporan
          </p>
        </div>
        <p className="text-sm text-slate-100">Tervalidasi Komunitas</p>
      </div>

      <div className="block-flex items-center gap-4 bg-white p-3 rounded-2xl shadow">
        <div className="p-2 inline-flex items-center gap-2">
          <MapPin className="text-green-700" />
          <p className="text-sm font-medium text-green-700">Aman</p>
        </div>
        <div className="p-2 inline-flex items-center gap-2">
          <MapPin className="text-yellow-700" />
          <p className="text-sm font-medium text-yellow-700">Siaga</p>
        </div>
        <div className="p-2 inline-flex items-center gap-2">
          <MapPin className="text-red-700" />
          <p className="text-sm font-medium text-red-700">Bahaya</p>
        </div>
      </div>
    </div>
  );
}