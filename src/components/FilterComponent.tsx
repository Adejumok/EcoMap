import React from 'react';

interface FilterComponentProps {
  filterType: string;
  setFilterType: (type: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filterType, setFilterType }) => {
  return (
    <div className='filter-component'>
      <label>Filter by Type: </label>
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="All">All</option>
        <option value="Solar">Solar</option>
        <option value="Wind">Wind</option>
        <option value="Hydro">Hydro</option>
      </select>
    </div>
  );
};

export default FilterComponent;
