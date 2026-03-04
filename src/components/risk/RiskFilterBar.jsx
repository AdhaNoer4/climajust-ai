import { Search } from "lucide-react";

export default function RiskFilterBar() {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex justify-between items-center">
      
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl w-72">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Cari lokasi..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <div>
        <select className="bg-gray-100 px-4 py-2 rounded-xl text-sm">
          <option>Hari Ini</option>
          <option>3 Hari</option>
          <option>7 Hari</option>
        </select>
      </div>
    </div>
  );
}