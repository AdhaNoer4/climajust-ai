import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'

const riskPoints = [
  {
    id: 1,
    lat: -7.5586,
    lng: 110.8216,
    level: 'high',
    label: 'Risiko Banjir'
  },
  {
    id: 2,
    lat: -7.5562,
    lng: 110.8249,
    level: 'medium',
    label: 'Angin Kencang'
  },
  {
    id: 3,
    lat: -7.5599,
    lng: 110.8182,
    level: 'low',
    label: 'Hujan Ringan'
  }
]

const riskColor = {
  high: '#ef4444',    // merah
  medium: '#f59e0b',  // kuning
  low: '#22c55e'      // hijau
}

export default function RiskMap() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="font-semibold mb-3 text-slate-800">
        Peta Risiko Iklim
      </h3>

      <MapContainer
        center={[-7.5586, 110.8216]}
        zoom={15}
        className="h-[320px] rounded-xl"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {riskPoints.map(point => (
          <CircleMarker
            key={point.id}
            center={[point.lat, point.lng]}
            radius={18}
            pathOptions={{
              color: riskColor[point.level],
              fillOpacity: 0.6
            }}
          >
            <Popup>
              <strong>{point.label}</strong>
              <br />
              Tingkat risiko: {point.level}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}