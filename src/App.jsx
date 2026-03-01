import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Mapping nama kota ke kode ADM4
const locationToAdm4 = {
  "Kemayoran, Jakarta Pusat": "31.71.03.1001",
  "Jebres, Surakarta": "33.72.04.1005",
  "Laweyan, Surakarta": "33.72.01.1002",
  // Tambahkan mapping kota lain di sini
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    adm4Code: "31.71.03.1001",
    cityName: "Kemayoran, Jakarta Pusat",
  });

  const handleSearchLocation = (locationData) => {
    setSelectedLocation({
      adm4Code: locationData.adm4Code,
      cityName: locationData.cityName,
    });

    document.getElementById('hero-weather')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <Home 
                selectedLocation={selectedLocation}
                onSearchLocation={handleSearchLocation}  // Kirim fungsi ke Home
              />
            }
          />
          <Route path="/peta-risiko" element={<div>Peta Risiko</div>} />
          <Route path="/laporan" element={<div>Laporan</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;