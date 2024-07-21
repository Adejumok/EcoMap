import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { locations, expansionSites } from './data';
import FilterComponent from '../src/components/FilterComponent';
import { Location, ExpansionSite } from './types';
import './App.css';

const API_KEY = import.meta.env.VITE_NREL_API_KEY as string;

interface SolarData {
  avg_dni: number;
  avg_ghi: number;
  avg_lat_tilt: number;
}

const App: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedExpansion, setSelectedExpansion] = useState<ExpansionSite | null>(null);
  const [solarData, setSolarData] = useState<SolarData | null>(null);

  const fetchSolarData = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${API_KEY}&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setSolarData(data.outputs.avg_dni); // Adjust according to API response structure
    } catch (error) {
      console.error('Error fetching solar data:', error);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchSolarData(selectedLocation.position.lat, selectedLocation.position.lng);
    }
  }, [selectedLocation]);

  const filteredLocations = filterType === 'All' ? locations : locations.filter(location => location.type === filterType);
  const filteredExpansionSites = filterType === 'All' ? expansionSites : expansionSites.filter(site => site.type === filterType);


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
      default:
        color = 'gray';
    }
    return L.divIcon({
      className: 'custom-icon',
      html: `<span style="background-color:${color};" class="marker-icon"></span>`,
    });
  };


  return (
    <div className="app-container">
      <h1>Renewable Energy Source Locator</h1>
      <FilterComponent filterType={filterType} setFilterType={setFilterType} />
      <div className="map-container">
        <MapContainer center={[6.5244, 3.3792]} zoom={10} style={{ height: '100%', width: '100%' }}>
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
                  setSelectedExpansion(null);
                },
              }}
            >
              {selectedLocation && selectedLocation.id === location.id && (
                <Popup
                  eventHandlers={{
                    remove: () => {
                      setSelectedLocation(null);
                      setSolarData(null);
                    },
                  }}
                >
                  <div>
                    <h2>{selectedLocation.name}</h2>
                    <p>Type: {selectedLocation.type}</p>
                    <p>Environmental Impact: {selectedLocation.impact}</p>
                    {solarData && (
                      <div>
                        <p>Average DNI: {solarData.avg_dni}</p>
                        <p>Average GHI: {solarData.avg_ghi}</p>
                        <p>Average Lat Tilt: {solarData.avg_lat_tilt}</p>
                      </div>
                    )}
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
          {filteredExpansionSites.map(site => (
            <Marker
              key={site.id}
              position={[site.position.lat, site.position.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedExpansion(site);
                  setSelectedLocation(null);
                },
              }}
            >
              {selectedExpansion && selectedExpansion.id === site.id && (
                <Popup
                  eventHandlers={{
                    remove: () => {
                      setSelectedExpansion(null);
                    },
                  }}
                >
                  <div>
                    <h2>{selectedExpansion.name}</h2>
                    <p>Type: {selectedExpansion.type}</p>
                    <p>Expansion Potential: {selectedExpansion.potential}</p>
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
