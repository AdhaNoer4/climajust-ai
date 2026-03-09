export default function LaporanForm() {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-md">
      <div className="space-y-6">
        <div className="text-center pt-5 pb-10 ">
          <h1 className="text-4xl font-semibold text-gray-800">Laporan Warga</h1>
        </div>
        {/* Judul */}
        <div>
          <label className="block mb-2 font-medium">Judul Laporan</label>

          <input type="text" placeholder="Judul Laporan" className="w-full border rounded-lg px-4 py-3 shadow-sm" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Wilayah */}
          <div>
            <label className="block mb-2 font-medium">Wilayah</label>

            <select className="w-full border rounded-lg px-4 py-3 shadow-sm">
              <option>Pilih Wilayah</option>
              <option>Surakarta</option>
              <option>Karanganyar</option>
              <option>Sukoharjo</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block mb-2 font-medium">Deskripsi</label>

            <textarea rows="3" placeholder="Deskripsi" className="w-full border rounded-lg px-4 py-3 shadow-sm" />
          </div>
        </div>

        {/* Risk Level */}
        <div className="flex gap-6 text-sm font-medium">
          <span className="flex items-center gap-2 text-green-600">● Rendah</span>

          <span className="flex items-center gap-2 text-orange-500">● Sedang</span>

          <span className="flex items-center gap-2 text-red-500">● Tinggi</span>
        </div>

        {/* Upload */}
        <div className="flex justify-between items-center border rounded-xl p-4">
          <div>
            <p className="font-medium">Upload Foto</p>
            <p className="text-sm text-gray-500">JPG, PNG, Maks. 5MB</p>
          </div>

          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">Kirim</button>
        </div>
      </div>
    </div>
  );
}
