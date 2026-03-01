import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';

// Fix untuk icon marker di React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function RiskMap({ center, weatherData, metadata }) {
  if (!center || !weatherData || !metadata) {
    return (
      <div className="h-[400px] rounded-xl bg-slate-100 flex items-center justify-center text-sm text-slate-500">
        Pilih lokasi terlebih dahulu
      </div>
    );
  }

  // Tentukan warna marker berdasarkan risiko
  const getRiskColor = (weather) => {
    const desc = weather?.description?.toLowerCase() || "";
    if (desc.includes("hujan lebat") || desc.includes("angin kencang")) {
      return "red";
    } else if (desc.includes("hujan") || desc.includes("angin")) {
      return "orange";
    }
    return "green";
  };

  const riskColor = getRiskColor(weatherData.weather);

  // Custom icon berdasarkan risiko
  const customIcon = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${riskColor}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer
      center={center}
      zoom={14}
      key={metadata.name} // penting agar re-render saat kota berubah
      className="h-[400px] rounded-xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={center} icon={customIcon}>
        <Popup>
          <div className="text-sm">
            <strong>{metadata.name}</strong><br/>
            Suhu: {weatherData.weather.temp}<br/>
            Cuaca: {weatherData.weather.description}<br/>
            Kelembaban: {weatherData.weather.humidity}%<br/>
            Angin: {weatherData.weather.wind}<br/>
            <span className={`font-semibold ${
              riskColor === 'red' ? 'text-red-600' : 
              riskColor === 'orange' ? 'text-orange-600' : 
              'text-green-600'
            }`}>
              Risiko: {riskColor === 'red' ? 'TINGGI' : 
                      riskColor === 'orange' ? 'SEDANG' : 'RENDAH'}
            </span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}