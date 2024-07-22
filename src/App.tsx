import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from './types';
import { centralCoordinate } from './centralCoordinates';
import './App.css';

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <div className="app-container">
      <h1>Renewable Energy Source Locator</h1>
      <div className="map-container">
        <MapContainer center={centralCoordinate} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={centralCoordinate}
            eventHandlers={{
              click: () => {
                setSelectedLocation({
                  id: 'region',
                  name: 'Africa Eastern and Southern',
                  position: centralCoordinate,
                  type: 'renewable',
                });
              },
            }}
          >
            {selectedLocation && selectedLocation.id === 'region' && (
              <Popup
                eventHandlers={{
                  remove: () => {
                    setSelectedLocation(null);
                  },
                }}
              >
                <div>
                  <h2>{selectedLocation.name}</h2>
                </div>
              </Popup>
            )}
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
