'use client';
import React from 'react';

type CategoryFiltersProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
};

const categories = ['All', 'OTT', 'E-commerce', 'Banking', 'Gaming'];

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => {
        const isSelected =
          selectedCategory === category || (selectedCategory === null && category === 'All');

        return (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === 'All' ? null : category)}
            className={`px-4 py-1 rounded-full text-sm border transition-all duration-200 ${
              isSelected
                ? 'bg-yellow-400 text-black border-yellow-500'
                : 'bg-zinc-800 text-white border-zinc-600 hover:bg-zinc-700'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilters;
