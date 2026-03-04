import RiskFilterBar from "../components/risk/RiskFilterBar";
import RiskStatsSidebar from "../components/risk/RiskStatsSidebar";
import RiskMapContainer from "../components/risk/RiskMapContainer";
import RiskTable from "../components/risk/RiskTable";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PetaRisiko() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-6 space-y-6">
      
      <Navbar />

    <main className="max-w-7xl mx-auto px-4 space-y-6">
      <RiskFilterBar />

      <div className="grid grid-cols-12 gap-6">
        
        {/* Sidebar */}
        <div className="col-span-3">
          <RiskStatsSidebar />
        </div>

        {/* Map */}
        <div className="col-span-9">
          <RiskMapContainer />
        </div>

      </div>

      <RiskTable />
      </main>
        <Footer />
    </div>
  );
}