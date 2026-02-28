import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function RiskMap({ city }) {
  if (!city) {
    return <div className="h-[400px] rounded-xl bg-slate-100 flex items-center justify-center text-sm text-slate-500">Pilih lokasi terlebih dahulu</div>;
  }
  return (
    <MapContainer
      center={[city.lat, city.lng]}
      zoom={14}
      key={city.name} // penting agar re-render saat kota berubah
      className="h-[400px] rounded-xl"
    >
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[city.lat, city.lng]} />
    </MapContainer>
  );
}
