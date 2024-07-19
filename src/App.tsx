import React, { useState } from 'react';
import MapComponent from '../src/components/MapComponent';
import FilterComponent from '../src/components/FilterComponent';

const App: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');

  return (
    <div>
      <h1>Renewable Energy Source Locator</h1>
      <MapComponent/>
    </div>
  );
};

export default App;
