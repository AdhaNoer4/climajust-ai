import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PetaRisiko from "./pages/PetaRisiko";
import Laporan from "./pages/Laporan";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    adm4Code: "33.72.04.1010",
    cityName: "Jebres, Surakarta",
    lat: -7.5586,
    lng: 110.8216,
  });

  const handleSearchLocation = (locationData) => {
    setSelectedLocation({
      adm4Code: locationData.adm4Code,
      cityName: locationData.cityName,
      lat: locationData.lat,
      lng: locationData.lng,
    });

    // Optional: scroll hanya relevan di Beranda
    document.getElementById("hero-weather")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            selectedLocation={selectedLocation}
            onSearchLocation={handleSearchLocation}
          />
        }
      />

      <Route
        path="/peta-risiko"
        element={
          <PetaRisiko
            selectedLocation={selectedLocation}
            onSearchLocation={handleSearchLocation}
          />
        }
      />

      <Route path="/laporan" element={<Laporan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;