import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from './types';
import { locations } from './data';
import { centralCoordinate } from './centralCoordinates';
import FilterComponent from './components/FilterComponent';
import './App.css';

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filterType, setFilterType] = useState<string>('All');

  const filteredLocations = filterType === 'All' ? locations : locations.filter(location => location.type === filterType);

  const getIcon = (type: string) => {
    let color;
    switch (type) {
      case 'Solar':
        color = 'orange';
        break;
      case 'Wind':
        color = 'blue';
        break;
      case 'Hydro':
        color = 'green';
        break;
      case 'Gas':
        color = 'yellow';
        break;
      default:
        color = 'gray';
    }
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color:${color}; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:black; font-weight:bold;"></div>`,
    });
  };

  return (
    <div className="app-container">
      <h1>Renewable Energy Source Locator</h1>
      <div className="map-container">
        <FilterComponent filterType={filterType} setFilterType={setFilterType} />
        <MapContainer center={centralCoordinate} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredLocations.map(location => (
            <Marker
              key={location.id}
              position={[location.position.lat, location.position.lng]}
              icon={getIcon(location.type)}
              eventHandlers={{
                click: () => {
                  setSelectedLocation(location);
                },
              }}
            >
              {selectedLocation && selectedLocation.id === location.id && (
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
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
