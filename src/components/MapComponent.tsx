import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
// import "leaflet-defaulticon-compatibility";
import { locations } from '../data';
import FilterComponent from './FilterComponent';
import { Location } from '../types';

const App: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filteredLocations = filterType === 'All' ? locations : locations.filter(location => location.type === filterType);

  return (
    <div className='map-container'>
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
                eventHandlers={{
                  remove: () => {
                    setSelectedLocation(null);
                  },
                }}              >
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
