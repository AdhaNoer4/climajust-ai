import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { jobRecommendations, determineRisk } from "../../utils/weatherUtils";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
function MapController({ center, markerRef }) {
  const map = useMap();

  useEffect(() => {
    if (!center) return;
    map.setView(center, 14);
    setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 300);
  }, [center]);

  return null;
}
export default function RiskMapContainer({ center, weatherData, metadata, userJob = "nelayan" }) {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [center]);

  if (!center || !weatherData || !metadata) {
    return (
      <div className="h-[500px] rounded-2xl bg-slate-100 flex items-center justify-center text-sm text-slate-500">
        Pilih lokasi terlebih dahulu
      </div>
    );
  }

  const getRiskColor = (weather) => {
    const desc = weather?.description?.toLowerCase() || "";
    if (desc.includes("hujan lebat") || desc.includes("angin kencang")) return "red";
    if (desc.includes("hujan") || desc.includes("angin")) return "orange";
    return "green";
  };

  const riskColor = getRiskColor(weatherData.weather);
  const risk = determineRisk(weatherData.weather);

  const customIcon = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${riskColor}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const firstRecommendation =
    jobRecommendations[userJob]?.[risk]?.[0] || "Pantau informasi cuaca secara berkala";

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {/* Map */}
      <div className="relative z-0">
        <MapContainer
          center={center}
          zoom={11}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController center={center} markerRef={markerRef} />
          <Marker position={center} icon={customIcon} ref={markerRef}>
            <Popup>
              <div className="text-sm">
                <strong>{metadata.name}</strong>
                <br />
                Suhu: {weatherData.weather.temp}
                <br />
                Cuaca: {weatherData.weather.description}
                <br />
                Kelembaban: {weatherData.weather.humidity}%
                <br />
                Angin: {weatherData.weather.wind}
                <br />
                <span className={`font-semibold ${
                  riskColor === "red" ? "text-red-600" :
                  riskColor === "orange" ? "text-orange-600" :
                  "text-green-600"
                }`}>
                  Risiko: {riskColor === "red" ? "TINGGI" : riskColor === "orange" ? "SEDANG" : "RENDAH"}
                </span>
                <hr className="my-1" />
                <span className="text-blue-600 font-medium">💡 {firstRecommendation}</span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Legenda */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-5 bg-white w-fit p-2 px-4 rounded-full shadow z-[999]">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 w-6 h-3 rounded-2xl"></div>
            <span className="text-green-600 font-semibold text-sm">Aman</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 w-6 h-3 rounded-2xl"></div>
            <span className="text-orange-600 font-semibold text-sm">Siaga</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-600 w-6 h-3 rounded-2xl"></div>
            <span className="text-red-600 font-semibold text-sm">Bahaya</span>
          </div>
        </div>
      </div>

     
    </div>
  );
}