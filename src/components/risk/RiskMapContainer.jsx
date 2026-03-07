import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RiskMapContainer() {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <MapContainer
        center={[-7.56, 110.82]}
        zoom={11}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}