export interface Location {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  type: string;
  impact: string;
}

export interface ExpansionSite {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  type: string;
  potential: string;
}
