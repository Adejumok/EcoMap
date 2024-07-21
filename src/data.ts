import { Location, ExpansionSite } from './types';

export const locations: Location[] = [
  { id: 1, name: 'Solar Plant', position: { lat: 34.0522, lng: -118.2437 }, type: 'Solar', impact: 'Low' }, // Los Angeles, CA
  { id: 2, name: 'Wind Farm', position: { lat: 36.1699, lng: -115.1398 }, type: 'Wind', impact: 'Moderate' }, // Las Vegas, NV
  { id: 3, name: 'Hydro Plant', position: { lat: 47.6062, lng: -122.3321 }, type: 'Hydro', impact: 'High' }, // Seattle, WA
];

export const expansionSites: ExpansionSite[] = [
  { id: 1, name: 'Potential Solar Site', position: { lat: 35.6895, lng: -105.9380 }, type: 'Solar', potential: 'High' }, // Santa Fe, NM
  { id: 2, name: 'Potential Wind Site', position: { lat: 40.7128, lng: -74.0060 }, type: 'Wind', potential: 'Moderate' }, // New York, NY
  { id: 3, name: 'Potential Hydro Site', position: { lat: 37.7749, lng: -122.4194 }, type: 'Hydro', potential: 'Low' }, // San Francisco, CA
];
