import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { locations } from './data';
import FilterComponent from '../src/components/FilterComponent';
import { Location } from './type';

const App: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filteredLocations = filterType === 'All' ? locations : locations.filter(location => location.type === filterType);

  return (
    <div>
      <h1>Renewable Energy Source Locator</h1>
      <FilterComponent filterType={filterType} setFilterType={setFilterType} />
      <MapContainer center={[6.5244, 3.3792]} zoom={10} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredLocations.map(location => (
          <Marker
            key={location.id}
            position={[location.position.lat, location.position.lng]}
            eventHandlers={{
              click: () => {
                setSelectedLocation(location);
              },
            }}
          >
            {selectedLocation && selectedLocation.id === location.id && (
              <Popup
                position={[selectedLocation.position.lat, selectedLocation.position.lng]}
                onClose={() => setSelectedLocation(null)}
              >
                <div>
                  <h2>{selectedLocation.name}</h2>
                  <p>Type: {selectedLocation.type}</p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default App;
