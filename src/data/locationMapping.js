// Mapping nama lokasi (yang dicari user) ke kode adm4 BMKG
export const locationToAdm4 = {
  // Jakarta
  "kemayoran": "31.71.03.1001",
  "jakarta pusat": "31.71",
  "menteng": "31.71.01.1003",
  
  // Jawa Tengah (Solo/Surakarta)
  "jebres": "33.72.04.1005", // Contoh kode untuk Jebres, Solo
  "laweyan": "33.72.01.1002", // Contoh kode untuk Laweyan, Solo
  "solo": "33.72",
  "surakarta": "33.72",
  "sragen": "33.14.01.2001",
  
  // Jawa Timur
  "surabaya": "35.78",
  "malang": "35.73",
  
  // Bandung
  "bandung": "32.73",
  
  // Default fallback
  "default": "31.71.03.1001" // Kemayoran sebagai default
};

// Data lengkap lokasi untuk ditampilkan di UI
export const locationDetails = {
  "31.71.03.1001": {
    name: "Kemayoran, Jakarta Pusat",
    province: "DKI Jakarta",
    city: "Jakarta Pusat"
  },
  "33.72.04.1005": {
    name: "Jebres, Surakarta",
    province: "Jawa Tengah",
    city: "Surakarta"
  },
  "33.72.01.1002": {
    name: "Laweyan, Surakarta",
    province: "Jawa Tengah",
    city: "Surakarta"
  },
  // Tambahkan lainnya sesuai kebutuhan
};