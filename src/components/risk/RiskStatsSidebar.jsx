import { Users, ChartColumnBig, FileExclamationPoint, MapPin } from "lucide-react";

const formatNumber = (num) => {
  if (!num && num !== 0) return "N/A";
  return new Intl.NumberFormat("id-ID").format(num);
};

export default function RiskStatsSidebar({ weatherData }) {
  const population = weatherData?.population;

  return (
    <div className="space-y-4 ">
      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow">
        <p className="text-4xl font-bold">58</p>
        <p className="text-sm">Wilayah Risiko Tinggi</p>
      </div>

      {/* Jumlah Warga — dari BPS */}
      <div className="bg-blue-400 rounded-2xl p-6 shadow">
        <p className="text-lg font-bold text-slate-100">
          <Users size={30} className="inline mr-1" /> {population ? `${formatNumber(population.total)} ${population.satuan || "Jiwa"}` : "900,000"}
          <p className="text-md font-medium text-slate-100 mb-1">Jumlah Warga</p>
        </p>
        {population && (
          <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
            <ChartColumnBig size={14} />
            Data {population.sumber} {population.tahun}
            {population.label && <span className="italic">({population.label})</span>}
          </p>
        )}
      </div>

      <div className="bg-emerald-400 rounded-2xl p-6 shadow">
        <div className="inline-flex justify-between gap-3">
          <FileExclamationPoint className="text-slate-100" />
          <p className="text-lg font-semibold text-slate-100">21 Laporan</p>
        </div>
        <p className="text-sm text-slate-100">DiValidasi Oleh AI</p>
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
        <div className=" p-2 inline-flex items-center gap-2">
          <MapPin className="text-red-700" />  
          <p className="text-sm font-medium text-red-700">Bahaya</p>
        </div>
      </div>
    </div>
  );
}
