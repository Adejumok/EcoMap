import React from 'react';

interface FilterComponentProps {
  filterType: string;
  setFilterType: (type: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filterType, setFilterType }) => {
  return (
    <div className="filter-component">
      <label htmlFor="filter">Filter by Type: </label>
      <select
        id="filter"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Gas">Gas</option>
        <option value="Hydro">Hydro</option>
        <option value="Wind">Wind</option>
        <option value="Solar">Solar</option>
      </select>
    </div>
  );
};

export default FilterComponent;
