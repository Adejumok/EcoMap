export const fetchOSMData = async (bbox: [number, number, number, number]) => {
  const query = `
    [out:json];
    (
      node["generator:source"="solar"](${bbox.join(",")});
      node["generator:source"="wind"](${bbox.join(",")});
      node["generator:source"="hydro"](${bbox.join(",")});
    );
    out body;
  `;
  
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.elements;
  } catch (error) {
    console.error('Error fetching OSM data:', error);
    return [];
  }
};
