
// Threats/SearchBar.jsx
import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

const SearchBar = ({ searchTerm, selectedCategory, categories, updateSearchParams }) => (
  <div className="mb-8">
    <div className="flex justify-between mb-4">
      <button
        onClick={() => updateSearchParams({ search: '', category: 'all', page: '1' })}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center space-x-2"
      >
        <RefreshCw className="h-4 w-4" /> <span>Refresh</span>
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search threats..."
          value={searchTerm}
          onChange={(e) => updateSearchParams({ search: e.target.value, page: '1' })}
          className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-md text-white"
        />
      </div>
      <div className="relative">
        <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <select
          value={selectedCategory}
          onChange={(e) => updateSearchParams({ category: e.target.value, page: '1' })}
          className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-md text-white"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default SearchBar;