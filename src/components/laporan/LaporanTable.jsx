import RiskBadge from "./RiskBadge";
import StatusBadge from "./StatusBadge";

const data = [
  {
    wilayah: "Surakarta",
    deskripsi: "Bengawan Solo Banjir",
    risiko: "tinggi",
    status: "pending",
  },
  {
    wilayah: "Karanganyar",
    deskripsi: "Waduk Lalung Jebol",
    risiko: "tinggi",
    status: "valid",
  },
];

export default function LaporanTable() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md overflow-hidden">
      <h2 className="text-xl font-semibold p-6">Daftar Laporan</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-blue-200 text-gray-800">
            <tr>
              <th className="p-4 text-left">Waktu</th>
              <th className="p-4 text-left">Wilayah</th>
              <th className="p-4 text-left">Deskripsi</th>
              <th className="p-4 text-left">Risiko</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">16:10 Selasa</td>

                <td className="p-4 font-semibold">{item.wilayah}</td>

                <td className="p-4">{item.deskripsi}</td>

                <td className="p-4">
                  <RiskBadge level={item.risiko} />
                </td>

                <td className="p-4">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
