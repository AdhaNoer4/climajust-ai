import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PetaRisiko from "./pages/PetaRisiko";
import Laporan from "./pages/Laporan";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    adm4Code: "33.72.04.1010",
    cityName: "Jebres, Surakarta",
    lat: -7.5586,
    lng: 110.8216,
  });

  // ✅ State user di dalam App
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const handleSearchLocation = (locationData) => {
    setSelectedLocation({
      adm4Code: locationData.adm4Code,
      cityName: locationData.cityName,
      lat: locationData.lat,
      lng: locationData.lng,
    });
    document.getElementById("hero-weather")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
  <Routes>
    <Route
      path="/"
      element={
        <Home
          selectedLocation={selectedLocation}
          onSearchLocation={handleSearchLocation}
          user={user}
          onLoginSuccess={setUser}
          onLogout={handleLogout}
        />
      }
    />
    <Route
      path="/peta-risiko"
      element={
        <PetaRisiko
          selectedLocation={selectedLocation}
          onSearchLocation={handleSearchLocation}
          user={user}
          onLoginSuccess={setUser}
          onLogout={handleLogout}
        />
      }
    />
    <Route path="/laporan" element={<Laporan />} />
  </Routes>
);
}

export default App;