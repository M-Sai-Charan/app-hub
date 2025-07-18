// components/SearchBar.tsx
import React from 'react';

type SearchBarProps = {
  query: string;
  setQuery: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search apps..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
};

export default SearchBar;
