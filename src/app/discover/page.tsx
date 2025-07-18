'use client';

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilters from '../components/CategoryFilters';
import TrendingApps from '../components/TrendingApps';
import AllAppsList from '../components/AllAppsList';


const DiscoverApps = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="bg-black min-h-screen text-white px-4 md:px-10 py-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">🔎 Discover Apps</h1>

      {/* Search Bar */}
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      {/* Category Filter Chips */}
      {/* <CategoryFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      /> */}

      {/* Trending Section */}
      <TrendingApps />

      {/* All Apps List */}
      <AllAppsList query={searchQuery} selectedCategory={selectedCategory} />
    </main>
  );
};

export default DiscoverApps;
