import { Users, ChartColumnBig } from "lucide-react";

const formatNumber = (num) => {
  if (!num && num !== 0) return "N/A";
  return new Intl.NumberFormat("id-ID").format(num);
};

export default function RiskStatsSidebar({ weatherData }) {
  const population = weatherData?.population;

  return (
    <div className="space-y-4 z-10">
      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow">
        <p className="text-4xl font-bold">58</p>
        <p className="text-sm">Wilayah Risiko Tinggi</p>
      </div>

      {/* Jumlah Warga — dari BPS */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <p className="text-sm font-medium text-blue-800 mb-1">
          <Users size={16} className="inline mr-1" /> Jumlah Warga
        </p>
        <p className="text-lg font-bold text-blue-900">
          {population ? `${formatNumber(population.total)} ${population.satuan || "Jiwa"}` : "900,000"}
        </p>
        {population && (
          <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
            <ChartColumnBig size={14} />
            Data {population.sumber} {population.tahun}
            {population.label && <span className="italic">({population.label})</span>}
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <p className="text-lg font-semibold">21 Laporan</p>
        <p className="text-sm text-gray-500">DiValidasi Oleh AI</p>
      </div>

      <div className="bg-green-100 rounded-2xl p-4">
        <p className="text-sm font-medium text-green-700">Aman</p>
      </div>
      <div className="bg-yellow-100 rounded-2xl p-4">
        <p className="text-sm font-medium text-yellow-700">Siaga</p>
      </div>
      <div className="bg-red-100 rounded-2xl p-4">
        <p className="text-sm font-medium text-red-700">Bahaya</p>
      </div>
    </div>
  );
}