import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchOSMData } from './fetchOSMData';
import FilterComponent from './components/FilterComponent';
import { Location } from './types';
import './App.css';

const App: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const fetchLocations = async () => {
    const bbox: [number, number, number, number] = [24.396308, -125.0, 49.384358, -66.93457]; // USA bounding box
    const data = await fetchOSMData(bbox);
    const parsedLocations = data.map((element: any) => ({
      id: element.id,
      name: element.tags.name || 'Unknown',
      position: { lat: element.lat, lng: element.lon },
      type: element.tags['generator:source'],
      impact: 'Unknown', // Replace with real data if available
    }));
    setLocations(parsedLocations);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const filteredLocations = filterType === 'All' ? locations : locations.filter(location => location.type === filterType);

  const getIcon = (type: string) => {
    let color;
    switch (type) {
      case 'solar':
        color = 'orange';
        break;
      case 'wind':
        color = 'blue';
        break;
      case 'hydro':
        color = 'green';
        break;
      default:
        color = 'gray';
    }
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color:${color}; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">${type[0].toUpperCase()}</div>`,
    });
  };

  return (
    <div className="app-container">
      <h1>Renewable Energy Source Locator</h1>
      <FilterComponent filterType={filterType} setFilterType={setFilterType} />
      <div className="map-container">
        <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: '100%', width: '100%' }}>
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
                    <p>Type: {selectedLocation.type}</p>
                    <p>Environmental Impact: {selectedLocation.impact}</p>
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
