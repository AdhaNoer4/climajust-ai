import Navbar from "../components/layout/Navbar";
import HeroWeather from "../components/home/HeroWeather";
import ImpactSidebar from "../components/home/ImpactSidebar";
import RiskMap from "../components/home/RiskMap"
import CityDetailSidebar from "../components/home/CityDetailSidebar"
import AIChat from "../components/home/AIChat"
import Footer from "../components/layout/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-sky-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 space-y-6">
        <HeroWeather />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <ImpactSidebar />
          </div>

          <div className="lg:col-span-6">
            <RiskMap />
          </div>

          <div className="lg:col-span-3">
            <CityDetailSidebar />
          </div>
        </section>

        <AIChat />
      </main>

      <Footer />
    </div>
  )
}
