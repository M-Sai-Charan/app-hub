'use client';

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilters from '../components/CategoryFilters';
import TrendingApps from '../components/TrendingApps';
import AllAppsList from '../components/AllAppsList';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
const DiscoverApps = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  return (
    <main className="bg-black min-h-screen text-white px-4 md:px-10 py-6">
      {/* Header with Back button in top-right */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">🔎 Discover Apps</h1>
        <button
          className="flex items-center gap-2 text-white hover:text-yellow-400"
          onClick={() => router.push('/dashboard')}
        >
          <FaArrowLeft className="text-lg" />
          <span>Back</span>
        </button>
      </div>

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
