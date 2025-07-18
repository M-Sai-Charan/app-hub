'use client';

import React from 'react';

const categories = ['All', 'Banking', 'Gaming', 'OTT', 'E-commerce'];

type Props = {
  selected: string;
  onSelect: (category: string) => void;
};

const CategoryFilters: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-3 px-4 overflow-x-auto mt-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
            selected === category
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;
