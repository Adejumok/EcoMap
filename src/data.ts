import { Location, ExpansionSite } from './types';

export const locations: Location[] = [
  { id: 1, name: 'Solar Plant', position: { lat: 6.5244, lng: 3.3792 }, type: 'Solar', impact: 'Low' },
  { id: 2, name: 'Wind Farm', position: { lat: 6.6000, lng: 3.3500 }, type: 'Wind', impact: 'Moderate' },
  { id: 3, name: 'Hydro Plant', position: { lat: 6.4500, lng: 3.4000 }, type: 'Hydro', impact: 'High' },
  // Add more locations as needed
];

export const expansionSites: ExpansionSite[] = [
  { id: 1, name: 'Potential Solar Site', position: { lat: 6.5000, lng: 3.4000 }, type: 'Solar', potential: 'High' },
  { id: 2, name: 'Potential Wind Site', position: { lat: 6.5800, lng: 3.3200 }, type: 'Wind', potential: 'Moderate' },
  { id: 3, name: 'Potential Hydro Site', position: { lat: 6.4800, lng: 3.4200 }, type: 'Hydro', potential: 'Low' },
  // Add more expansion sites as needed
];
