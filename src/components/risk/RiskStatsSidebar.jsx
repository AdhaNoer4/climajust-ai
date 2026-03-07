export default function RiskStatsSidebar() {
  return (
    <div className="space-y-4">

      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow">
        <p className="text-4xl font-bold">58</p>
        <p className="text-sm">Wilayah Risiko Tinggi</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <p className="text-lg font-semibold">900,000</p>
        <p className="text-sm text-gray-500">Jumlah Warga</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow">
        <p className="text-lg font-semibold">900,000</p>
        <p className="text-sm text-gray-500">Jumlah Warga</p>
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