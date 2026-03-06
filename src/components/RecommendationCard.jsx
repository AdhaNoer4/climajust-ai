import { Bot, CircleCheckBig, Lightbulb } from "lucide-react";

export default function RecommendationCard({ weatherData, userJob = "petani" }) {

  const weather = weatherData?.weather;

  const jobRecommendations = {
    petani: {
      high: [
        "Tunda aktivitas di lahan karena hujan lebat atau badai",
        "Periksa saluran irigasi untuk mencegah banjir",
        "Amankan alat pertanian dari angin kencang",
      ],
      medium: [
        "Perhatikan kondisi tanah sebelum menanam",
        "Siapkan penutup tanaman jika hujan turun",
        "Pantau cuaca sebelum melakukan penyemprotan",
      ],
      low: [
        "Cuaca baik untuk aktivitas di lahan",
        "Lakukan pemupukan atau perawatan tanaman",
        "Periksa kondisi tanaman secara rutin",
      ],
    },

    nelayan: {
      high: [
        "Hindari melaut karena risiko gelombang tinggi",
        "Amankan kapal di pelabuhan",
        "Pantau informasi cuaca laut",
      ],
      medium: [
        "Gunakan alat keselamatan saat melaut",
        "Batasi jarak pelayaran",
        "Perhatikan arah angin dan arus laut",
      ],
      low: [
        "Kondisi laut relatif aman untuk melaut",
        "Periksa peralatan sebelum berangkat",
        "Tetap pantau perubahan cuaca",
      ],
    },

    pengemudi: {
      high: [
        "Kurangi kecepatan kendaraan",
        "Hindari jalan rawan banjir",
        "Pastikan lampu dan wiper berfungsi",
      ],
      medium: [
        "Jaga jarak aman antar kendaraan",
        "Perhatikan kondisi jalan licin",
        "Gunakan lampu saat hujan",
      ],
      low: [
        "Kondisi jalan relatif aman",
        "Tetap waspada terhadap perubahan cuaca",
        "Periksa kendaraan sebelum perjalanan",
      ],
    },
  };

  const determineRisk = (weather) => {
    const desc = weather?.description?.toLowerCase() || "";

    if (
      desc.includes("hujan lebat") ||
      desc.includes("angin kencang") ||
      desc.includes("badai")
    ) {
      return "high";
    } else if (
      desc.includes("hujan") ||
      desc.includes("angin") ||
      desc.includes("berawan")
    ) {
      return "medium";
    }

    return "low";
  };

  const risk = determineRisk(weather);

  const recommendations =
    jobRecommendations[userJob]?.[risk] || [
      "Pantau informasi cuaca secara berkala",
      "Batasi aktivitas luar ruangan jika cuaca memburuk",
      "Utamakan keselamatan dalam beraktivitas",
    ];

  return (
    <div className="relative bg-white rounded-2xl shadow mt-7 p-4 pt-6 space-y-3">
      <div className="absolute -top-4 left-0 right-0">
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-3 py-2 text-sm font-medium rounded-t-2xl">
          <Bot size={16} />
          Rekomendasi AI
        </div>
      </div>

      <ul className="space-y-2 text-sm text-slate-700">
        {recommendations.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <CircleCheckBig size={16} className="text-green-500" />
            {item}
          </li>
        ))}
      </ul>

      <div className="bg-sky-50 text-sky-700 text-xs rounded-lg p-2">
        <Lightbulb size={14} className="inline mr-1 text-yellow-300" />
        Rekomendasi disesuaikan dengan kondisi cuaca dan jenis pekerjaan Anda.
      </div>
    </div>
  );
}