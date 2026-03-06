import {
  Bot, CircleCheckBig, Lightbulb,
  Tractor,
  Fish,
  Car,
  HardHat,
  Store,
  Bike,
  Camera,
} from "lucide-react";

export default function RecommendationCard({ weatherData, userJob = "petani" }) {
  const formatJob = (job) => {
    return job.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  };
  const jobIcons = {
    petani: <Tractor size={16} />,
    nelayan: <Fish size={16} />,
    pengemudi: <Car size={16} />,
    pekerja_konstruksi: <HardHat size={16} />,
    pedagang_kaki_lima: <Store size={16} />,
    ojek_online: <Bike size={16} />,
    fotografer_luar_ruang: <Camera size={16} />,
  };
  const riskColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };
  const weather = weatherData?.weather;

  const jobRecommendations = {

    petani: {
      high: [
        "Tunda aktivitas di lahan karena hujan lebat",
        "Periksa sistem drainase lahan",
        "Amankan alat pertanian dari angin kencang",
      ],
      medium: [
        "Pantau kondisi tanah sebelum menanam",
        "Siapkan penutup tanaman",
        "Perhatikan potensi hujan lokal",
      ],
      low: [
        "Cuaca baik untuk aktivitas pertanian",
        "Lakukan pemupukan dan penyiraman",
        "Periksa kondisi tanaman",
      ],
    },

    nelayan: {
      high: [
        "Hindari melaut karena potensi gelombang tinggi",
        "Amankan kapal di pelabuhan",
        "Pantau informasi cuaca laut",
      ],
      medium: [
        "Gunakan alat keselamatan saat melaut",
        "Batasi jarak pelayaran",
        "Perhatikan arah angin",
      ],
      low: [
        "Kondisi laut relatif aman",
        "Periksa peralatan sebelum berangkat",
        "Tetap pantau perubahan cuaca",
      ],
    },

    pengemudi: {
      high: [
        "Kurangi kecepatan kendaraan",
        "Hindari jalur rawan banjir",
        "Pastikan lampu kendaraan menyala",
      ],
      medium: [
        "Jaga jarak aman",
        "Perhatikan jalan licin",
        "Gunakan lampu saat hujan",
      ],
      low: [
        "Kondisi jalan relatif aman",
        "Tetap waspada perubahan cuaca",
        "Periksa kendaraan sebelum perjalanan",
      ],
    },

    pekerja_konstruksi: {
      high: [
        "Hentikan pekerjaan di ketinggian",
        "Amankan alat berat",
        "Periksa instalasi listrik proyek",
      ],
      medium: [
        "Gunakan alat keselamatan tambahan",
        "Waspadai permukaan licin",
        "Pantau kondisi angin",
      ],
      low: [
        "Cuaca mendukung pekerjaan luar ruangan",
        "Lanjutkan aktivitas konstruksi",
        "Periksa stabilitas peralatan",
      ],
    },

    pedagang_kaki_lima: {
      high: [
        "Amankan tenda atau gerobak dari angin",
        "Pertimbangkan menutup sementara",
        "Lindungi barang dari air",
      ],
      medium: [
        "Gunakan penutup tambahan",
        "Pantau perubahan cuaca",
        "Siapkan perlindungan barang",
      ],
      low: [
        "Cuaca mendukung aktivitas jualan",
        "Tetap pantau perubahan cuaca",
        "Pastikan area jualan aman",
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
      <div className="flex items-center gap-2 text-sm text-slate-600">
        {jobIcons[userJob] || <Bot size={16} />}
        Pekerjaan: {formatJob(userJob)}
      </div>
      <div className={`text-xs px-2 py-1 rounded w-fit ${riskColors[risk]}`}>
        Risiko Cuaca: {risk.toUpperCase()}
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