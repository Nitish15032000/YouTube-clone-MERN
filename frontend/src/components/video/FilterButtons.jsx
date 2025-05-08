import React from 'react';

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = ['All', 'Music', 'Gaming', 'Live', 'React', 'Programming', 'Podcasts'];

  return (
    <div className="flex gap-4 overflow-x-auto py-4 px-4 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`
            px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
            ${activeFilter === filter
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }
            transition-colors duration-200
          `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;