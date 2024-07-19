export interface Location {
    id: number;
    name: string;
    position: {
      lat: number;
      lng: number;
    };
    type: string;
  }
  
  export const locations: Location[] = [
    { id: 1, name: 'Solar Plant', position: { lat: 37.7749, lng: -122.4194 }, type: 'Solar' },
    { id: 2, name: 'Wind Farm', position: { lat: 36.7783, lng: -119.4179 }, type: 'Wind' },
    // Add more locations
  ];
  