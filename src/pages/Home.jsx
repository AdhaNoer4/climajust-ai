import Navbar from "../components/layout/Navbar";
import HeroWeather from "../components/home/HeroWeather";
import ImpactSidebar from "../components/home/ImpactSidebar";
import RiskMap from "../components/home/RiskMap";
import CityDetailSidebar from "../components/home/CityDetailSidebar";
import AIChat from "../components/home/AIChat";
import Footer from "../components/layout/Footer";
import { useState } from "react";

const cityData = {
  jebres: {
    name: "Jebres, Surakarta",
    lat: -7.5586,
    lng: 110.8216,
    risk: "high",
    people: "500.000",
    temp: "29°C",
    weather: "Hujan Lebat",
    wind: "18 km/j",
    humidity: "85",
  },
  laweyan: {
    name: "Laweyan, Surakarta",
    lat: -7.5662,
    lng: 110.8165,
    risk: "medium",
    people: "300.000",
    temp: "30°C",
    weather: "Berawan",
    wind: "12 km/j",
    humidity: "70",
  },
};

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("jebres");

  const city = cityData[selectedCity];
  return (
    <div className="min-h-screen bg-sky-100">
      <Navbar onSelectCity={setSelectedCity} />

      <main className="max-w-7xl mx-auto px-4 space-y-6">
        <HeroWeather city={city} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <ImpactSidebar city={city} />
          </div>

          <div className="lg:col-span-6">
            <RiskMap city={city} />
          </div>

          <div className="lg:col-span-3">
            <CityDetailSidebar city={city} />
          </div>
        </section>

        <AIChat city={city} />
      </main>

      <Footer />
    </div>
  );
}
