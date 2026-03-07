export const jobRecommendations = {
  petani: {
    high: ["Tunda aktivitas di lahan karena hujan lebat", "Periksa sistem drainase lahan", "Amankan alat pertanian dari angin kencang"],
    medium: ["Pantau kondisi tanah sebelum menanam", "Siapkan penutup tanaman", "Perhatikan potensi hujan lokal"],
    low: ["Cuaca baik untuk aktivitas pertanian", "Lakukan pemupukan dan penyiraman", "Periksa kondisi tanaman"],
  },
  nelayan: {
    high: ["Hindari melaut karena potensi gelombang tinggi", "Amankan kapal di pelabuhan", "Pantau informasi cuaca laut"],
    medium: ["Gunakan alat keselamatan saat melaut", "Batasi jarak pelayaran", "Perhatikan arah angin"],
    low: ["Kondisi laut relatif aman", "Periksa peralatan sebelum berangkat", "Tetap pantau perubahan cuaca"],
  },
  pengemudi: {
    high: ["Kurangi kecepatan kendaraan", "Hindari jalur rawan banjir", "Pastikan lampu kendaraan menyala"],
    medium: ["Jaga jarak aman", "Perhatikan jalan licin", "Gunakan lampu saat hujan"],
    low: ["Kondisi jalan relatif aman", "Tetap waspada perubahan cuaca", "Periksa kendaraan sebelum perjalanan"],
  },
  pekerja_konstruksi: {
    high: ["Hentikan pekerjaan di ketinggian", "Amankan alat berat", "Periksa instalasi listrik proyek"],
    medium: ["Gunakan alat keselamatan tambahan", "Waspadai permukaan licin", "Pantau kondisi angin"],
    low: ["Cuaca mendukung pekerjaan luar ruangan", "Lanjutkan aktivitas konstruksi", "Periksa stabilitas peralatan"],
  },
  pedagang_kaki_lima: {
    high: ["Amankan tenda atau gerobak dari angin", "Pertimbangkan menutup sementara", "Lindungi barang dari air"],
    medium: ["Gunakan penutup tambahan", "Pantau perubahan cuaca", "Siapkan perlindungan barang"],
    low: ["Cuaca mendukung aktivitas jualan", "Tetap pantau perubahan cuaca", "Pastikan area jualan aman"],
  },
  ojek_online: {
    high: ["Hindari berkendara saat hujan deras", "Tolak order jika cuaca berbahaya", "Gunakan jas hujan tebal"],
    medium: ["Gunakan jas hujan dan berkendara hati-hati", "Kurangi kecepatan di jalan basah", "Waspada genangan air"],
    low: ["Kondisi aman untuk berkendara", "Tetap pantau perubahan cuaca", "Periksa kendaraan sebelum order"],
  },
  fotografer_luar_ruang: {
    high: ["Lindungi peralatan kamera dari hujan", "Tunda sesi foto luar ruang", "Simpan peralatan di tempat aman"],
    medium: ["Waspadai cuaca berubah saat sesi foto", "Bawa penutup kamera cadangan", "Pantau prakiraan cuaca"],
    low: ["Cuaca ideal untuk sesi foto luar ruang", "Manfaatkan cahaya alami", "Siapkan peralatan lengkap"],
  },
};

export const determineRisk = (weather) => {
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