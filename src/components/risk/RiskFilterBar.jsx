import { MapPin } from "lucide-react";

export default function RiskFilterBar({ weatherData, metadata }) {
  return (
    <div className="bg-white/80 shadow rounded-2xl p-4 flex justify-center items-center flex-wrap gap-20">

      {/* Info Lokasi */}
      <div className="bg-white p-3 rounded-xl inline-flex items-center gap-4">
        <h2 className="font-semibold text-slate-700 inline-flex items-center gap-2">
          <MapPin /> {metadata?.name}
        </h2>

        <p className="text-sm text-slate-500">
          Curah hujan: {weatherData?.rain ?? "-"} mm
          {" • "}
          Suhu: {weatherData?.temperature ?? "-"}°C
        </p>

       
      </div>
      <div className=" bg-white/0 p-6 border-l-1 border-gray-400 h-10" >
      </div>


      <div>
        <p className="text-md text-start text-slate-800">
          Peta Menunjukan Analisis Risiko Cuaca Tingkat Wilayah.
        </p>
      </div>

      {/* Filter Waktu */}
      <div>
        <select className="bg-white px-4 py-2 rounded-xl text-sm">
          <option>Hari Ini</option>
          <option>3 Hari</option>
          <option>7 Hari</option>
        </select>
      </div>

    </div>
  );
}