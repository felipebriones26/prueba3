// src/components/EventsMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet

// Corrige un problema común con los íconos de los marcadores en React
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


//mishh
function EventsMap() {
  const position = [-33.45, -70.66]; // Coordenadas para centrar el mapa (Santiago)
  const eventos = [
    { nombre: 'Santiago Game Fest', coord: [-33.45, -70.66] },
    { nombre: 'Valpo eSports Meet', coord: [-33.047, -71.612] },
    { nombre: 'Concepción LAN Party', coord: [-36.826, -73.049] }
  ];

  return (
    <div className="my-5">
      <h2>🗺️ Eventos</h2>
      <p>Asiste a eventos y gana puntos LevelUp</p>
      <MapContainer center={position} zoom={5} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {eventos.map((evento, index) => (
          <Marker key={index} position={evento.coord}>
            <Popup>
              <b>{evento.nombre}</b><br />Gana 20 pts LevelUp asistiendo.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default EventsMap;