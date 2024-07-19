import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { locations, Location } from '../data';
import FilterComponent from './FilterComponent';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};

const center = { 
  lat: 6.5244,
  lng: 3.3792,
};

const MapComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filterType, setFilterType] = useState<string>('All');

  const filteredLocations = filterType === 'All' ? locations : locations.filter(location => location.type === filterType);

  return (
    <div>
      <FilterComponent filterType={filterType} setFilterType={setFilterType} />
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={8}>
          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              onClick={() => setSelectedLocation(location)}
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h2>{selectedLocation.name}</h2>
                <p>Type: {selectedLocation.type}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
