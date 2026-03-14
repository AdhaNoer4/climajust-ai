import { MapPin } from "lucide-react";

export default function RiskFilterBar({ weatherData, metadata }) {
  return (
    <div className="bg-white/80 shadow rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-10">

      {/* Info Lokasi */}
      <div className="bg-white p-3 rounded-xl flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
        <h2 className="font-semibold text-slate-700 inline-flex items-center gap-2">
          <MapPin size={18} /> {metadata?.name}
        </h2>

        <p className="text-xs sm:text-sm text-slate-500">
          Curah hujan: {weatherData?.rain ?? "-"} mm
          {" • "}
          Suhu: {weatherData?.weather.temp ?? "-"}
        </p>

       
      </div>
      <div className="hidden md:block h-8 border-l border-gray-300">
      </div>


      <div>
        <p className="text-sm md:text-md text-slate-700 text-center md:text-left max-w-md">
          Peta menunjukan analisis risiko cuaca tingkat wilayah.
        </p>
      </div>

      {/* Filter Waktu */}
      <div>
        <select className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm w-full md:w-auto">
          <option>Hari Ini</option>
          <option>3 Hari</option>
          <option>7 Hari</option>
        </select>
      </div>

    </div>
  );
}