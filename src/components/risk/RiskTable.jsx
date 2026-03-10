export default function RiskTable() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Daftar Wilayah Risiko Tinggi</h3>

      <table className="w-full text-sm ">
        <thead>
          <tr className="bg-blue-100 text-left ">
            <th className="p-3">Wilayah</th>
            <th className="p-3">Jumlah Warga</th>
            <th className="p-3">Status Cuaca</th>
            <th className="p-3">Level Risiko</th>
            <th className="p-3">Detail</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-slate-400 bg-slate-50">
            <td className="p-3 font-medium">Surakarta</td>
            <td className="p-3">900,000</td>
            <td className="p-3">Hujan Lebat, Angin Kencang</td>
            <td className="p-3 ">
              <div className="px-3 py-1 bg-red-600 text-white rounded-lg font-semibold w-fit">Tinggi</div>{" "}
            </td>
            <td className="p-3">
              <button className="bg-orange-400 text-white px-3 py-1 rounded-lg">Lihat</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
